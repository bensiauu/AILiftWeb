import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "app-period-statistics",
    templateUrl: "./period-statistics.component.html",
    styleUrls: ["./period-statistics.component.scss"],
})
export class PeriodStatisticsComponent {
    // Inputs for dynamic data
    categoryAxisCategories: string[] = [];
    serialNumbers: string[] = [];
    predictionData: any = {
        prediction1: [],
        prediction0: [],
    };
    faults = [];
    faultTypes = [];

    selectedRange = "1 Year"; // Default selection
    showOptions = false; // Initially, the options are hidden

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.onTimeRangeChange();
    }

    toggleOptions() {
        this.showOptions = !this.showOptions;
    }

    setTimeRange(range: string) {
        this.selectedRange = range;
        this.showOptions = false; // Close the options after selection
    }

    onTimeRangeChange() {
        // Calculate start and end dates based on selected range
        const endDate = new Date(); // Current date
        let startDate: Date;

        switch (this.selectedRange) {
            case "24 Hours":
                startDate = new Date();
                startDate.setDate(endDate.getDate() - 1);
                break;
            case "3 Months":
                startDate = new Date();
                startDate.setMonth(endDate.getMonth() - 3);
                break;
            case "1 Year":
                startDate = new Date();
                startDate.setFullYear(endDate.getFullYear() - 1);
                break;
            default:
                return;
        }

        // Convert dates to ISO format
        const startDateISO = startDate.toISOString().split(".")[0];
        const endDateISO = endDate.toISOString().split(".")[0];

        const apiUrl = `http://localhost:8002/api/v1/faults?start_date=${startDateISO}&end_date=${endDateISO}&page_size=10`;
        this.http
            .get(apiUrl, { headers: { "Content-Type": "text/plain" } })
            .subscribe(
                (response: any) => {
                    this.faults = response || [];
                    this.prepareChartData();
                },
                (error) => {
                    console.error("Error fetching faults:", error);
                }
            );
    }

    getFaultColor(faultType: string): string {
        switch (faultType) {
            case 'Fault 1: Jerk (X/Y/Z)':
                return '#FDD835';
            case 'Fault 2: Abnormal Acceleration':
                return '#FFA726';
            case 'Fault 3: Sudden Stop':
                return '#EF5350';
            default:
                return '#5687F2'; // fallback color if needed
        }
    }


    prepareChartData() {
        const serialMap = new Map<string, { [key: string]: number }>();
        const faultTypesSet = new Set<string>();

        // Loop through the faults data
        this.faults.forEach((fault) => {
            const serialNumber = fault?.data?.serial_number;
            const predictions = fault?.prediction || [];

            if (serialNumber) {
                if (!serialMap.has(serialNumber)) {
                    serialMap.set(serialNumber, {});
                }
                const data = serialMap.get(serialNumber);

                // Process each prediction
                predictions.forEach((prediction) => {
                    if (prediction.fault_type !== "Healthy") {
                        faultTypesSet.add(prediction.fault_type); // Collect unique fault types
                        data[prediction.fault_type] = (data[prediction.fault_type] || 0) + 1;
                    }
                });
            }
        });

        // Get serial numbers (categories for the x-axis)
        this.serialNumbers = Array.from(serialMap.keys());

        // Sort the fault types alphabetically
        this.faultTypes = Array.from(faultTypesSet).sort();

        // Build predictionData for each fault type in the sorted order
        this.predictionData = {};
        this.faultTypes.forEach((faultType) => {
            this.predictionData[faultType] = this.serialNumbers.map(
                (serial) => serialMap.get(serial)?.[faultType] || 0
            );
        });

        console.log(this.predictionData);
    }



}
