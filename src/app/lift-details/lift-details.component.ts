import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

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
    public trips: any[] = [];

    constructor(private route: ActivatedRoute, private http: HttpClient) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.liftName = params.get("name");
            this.fromDateTime = new Date(2024, 0, 1, 0, 0, 0);
            this.toDateTime = new Date()
            this.formattedFromDateTime = this.fromDateTime.toDateString();
            this.formattedToDateTime = this.toDateTime.toDateString();
            this.fetchFaultData();
        });
    }

    ngAfterInit(): void {
        this.updateFaultChart();
    }

    onDateChange(): void {
        this.fetchFaultData();
        this.formattedFromDateTime = this.fromDateTime.toDateString();
        this.formattedToDateTime = this.toDateTime.toDateString();
        this.updateFaultChart();
    }

    // Fetch fault data from the API
    fetchFaultData(): void {
        const startDateISO = this.fromDateTime.toISOString().split(".")[0];
        const endDateISO = this.toDateTime.toISOString().split(".")[0];

        const apiUrl = `http://localhost:8002/api/v1/predictions/${this.liftName}?start_date=${startDateISO}&end_date=${endDateISO}&page_size=200`;

        this.http.get(apiUrl, { headers: { "Content-Type": "text/plain" } }).subscribe(
            (response: any) => {
                this.trips = response || [];
            },
            (error) => {
                console.error("Error fetching faults:", error);
            }
        );
    }

    public onSelectionChange(event: any): void {
        this.selectedTrip = event.selectedRows[0].dataItem;
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

    processData() {
        // Process the lbb data and populate necessary arrays
        const data = this.selectedTrip.data.lbb;
        this.xData = data.map((item: { x: any; }) => item.x);
        this.yData = data.map((item: { y: any; }) => item.y);
        this.zData = data.map((item: { z: any; }) => item.z);
        const timestamps = data.map((item: { timestamp: any; }) => item.timestamp);
        const startTimestamp = timestamps[0];  // Get the first timestamp
        const startTimeInSeconds = this.parseTimestamp(startTimestamp);

        // Calculate elapsed time in seconds for each data point
        this.categories = timestamps.map((timestamp: string) => {
            const elapsedTime = this.parseTimestamp(timestamp) - startTimeInSeconds;
            return elapsedTime;
        });
    }

    getFaultType(predictions: any[]): string {
        if (!predictions || predictions.length === 0) {
            return "Healthy"; // Default value if no predictions exist
        }

        const fault = predictions.find(p => p.fault_type !== "Healthy");
        return fault ? fault.fault_type : "Healthy"; // Return the first non-Healthy fault type or default to Healthy
    }

    faultCategories: string[] = ['Jerk (X/Y/Z)', 'Sudden drop'];
    faultData: number[] = [];

    updateFaultChart(): void {

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

        // If no faults found, default to "Healthy"
        if (Object.keys(faultCounts).length === 0) {
            this.faultData = [1]; // Default if all predictions are "Healthy"
        } else {
            this.faultData = Object.values(faultCounts);
        }

    }



}
