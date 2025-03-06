import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { GridComponent } from "@progress/kendo-angular-grid";

@Component({
    selector: "app-lift-details",
    templateUrl: "./lift-details.component.html",
    styleUrls: ["./lift-details.component.scss"],
})
export class LiftDetailsComponent implements OnInit {
    // Show lift name
    liftName: string;
    // Accelerometer data
    lbbData: any[] = [];
    xData: any[] = [];
    yData: any[] = [];
    zData: any[] = [];
    categories: any[] = [];



    // For date picker
    fromDateTime: Date = new Date();
    toDateTime: Date = new Date();
    minDateTime: Date = new Date(2000, 0, 1);
    maxDateTime: Date = new Date();
    formattedFromDateTime: string;
    formattedToDateTime: string;


    public selectedTrip: any;
    public selectedTripNo: any[] = [0];
    public trips: any[] = [];
    predefinedColors: { [key: string]: string } = {
        'Healthy': '#66BB6A',
        'Fault 1: Jerk (X/Y/Z)': '#FDD835',
        'Fault 2: Abnormal Acceleration': '#FFA726',
        'Fault 3: Sudden Stop': '#EF5350'
    };

    constructor(private route: ActivatedRoute, private http: HttpClient) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.liftName = params.get("name");
            this.fromDateTime = new Date(2024, 0, 1, 0, 0, 0);
            this.toDateTime = new Date()
            this.formattedFromDateTime = this.fromDateTime.toDateString();
            this.formattedToDateTime = this.toDateTime.toDateString();
            this.fetchTripData();
            this.updateFaultBarChart();
        });
    }


    onDateChange(): void {
        this.fetchTripData();
        this.formattedFromDateTime = this.fromDateTime.toDateString();
        this.formattedToDateTime = this.toDateTime.toDateString();
    }

    // Fetch fault data from the API
    fetchTripData(): void {
        const startDateISO = this.fromDateTime.toISOString().split(".")[0];
        const endDateISO = this.toDateTime.toISOString().split(".")[0];

        const apiUrl = `http://localhost:8002/api/v1/predictions/${this.liftName}?start_date=${startDateISO}&end_date=${endDateISO}&page_size=200`;

        this.http.get(apiUrl, { headers: { "Content-Type": "text/plain" } }).subscribe(
            (response: any) => {
                this.trips = response || [];

                // Automatically select the first row, if available.
                if (this.trips.length > 0) {
                    this.selectedTripNo[0] = this.trips[0].data.trip_no;
                    this.selectedTrip = this.trips[0];
                    this.processData();
                    this.updateFaultBarChart();
                }
                console.log("trip num from request:", this.selectedTripNo);
            },
            (error) => {
                console.error("Error fetching faults:", error);
            }
        );
    }

    public onSelectionChange(event: any): void {
        this.selectedTrip = event.selectedRows[0].dataItem;
        this.selectedTripNo[0] = event.selectedRows[0].dataItem.data.trip_no;
        console.log("trip num: ", this.selectedTripNo);
        this.processData();
    }

    parseTimestamp(timestamp: string): number {
        // Assuming the timestamp is in HH:MM:SS:MS format
        const parts = timestamp.split(':');  // ['11', '11', '55', '707290']

        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        const seconds = parseInt(parts[2], 10);
        const milliseconds = parseInt(parts[3], 10);

        // Convert to total seconds
        return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000000;
    }

    public xAxisMax: any;
    public xAxisStep: any;
    processData() {
        const data = this.selectedTrip.data.lbb;

        console.log("i should be preparing data for ", this.selectedTrip.data.trip_no);
        if (!data || data.length === 0) return;

        // Extract XYZ data
        this.xData = data.map((item) => item.x);
        this.yData = data.map((item) => item.y);
        this.zData = data.map((item) => item.z);

        // Extract timestamps and normalize them
        const timestamps = data.map((item) => item.timestamp);
        const startTimeInSeconds = this.parseTimestamp(timestamps[0]);

        // Compute elapsed time (in seconds) for each timestamp
        const elapsedTimes = timestamps.map(ts => this.parseTimestamp(ts) - startTimeInSeconds);

        // Save elapsed times as the categories (x-axis values)
        this.categories = elapsedTimes;

        // Calculate max value and a reasonable step (e.g., divide into 10 intervals)
        this.xAxisMax = elapsedTimes[elapsedTimes.length - 1];
        this.xAxisStep = Math.ceil(this.xAxisMax.length / 5);
    }


    getFaultType(predictions: any[]): string {
        if (!predictions || predictions.length === 0) {
            return "Healthy"; // Default value if no predictions exist
        }

        const fault = predictions.find(p => p.fault_type !== "Healthy");
        return fault ? fault.fault_type : "Healthy"; // Return the first non-Healthy fault type or default to Healthy
    }

    getGaugeColor(predictions: any[]): string {
        const fault = this.getFaultType(predictions);
        return this.predefinedColors[fault];
    }

    faultCategories: string[] = [];
    faultData: any[] = [];

    updateFaultBarChart(): void {

        // Collect fault types from all trips, excluding "Healthy"
        let faultCounts: { [key: string]: number } = {};

        this.trips.forEach(trip => {
            if (trip && trip.prediction) {
                trip.prediction.forEach(prediction => {
                    if (prediction.fault_type !== "Healthy") {
                        faultCounts[prediction.fault_type] = (faultCounts[prediction.fault_type] || 0) + 1;
                    }
                });
            }
        });
        // Convert the faultCounts object into an array of key-value pairs, sort it, then extract keys & values
        const sortedFaults = Object.entries(faultCounts).sort(([a], [b]) => a.localeCompare(b));

        // Extract sorted categories and their corresponding counts
        this.faultCategories = sortedFaults.map(([key]) => key);
        this.faultData = sortedFaults.map(([, value]) => value);
        // Create an array of faultData objects that include the fault type, count, and corresponding color.
        this.faultData = sortedFaults.map(([faultType, count]) => ({
            category: faultType,
            value: count,
            color: this.predefinedColors[faultType] || '#5687F2' // Fallback color if not defined
        }));

    }



}
