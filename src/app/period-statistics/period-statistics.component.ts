import { Component, Input } from "@angular/core";
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

  selectedRange = "24 Hours"; // Default selection
  showOptions = false; // Initially, the options are hidden

  constructor(private http: HttpClient) {}

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

    const apiUrl = `http://localhost:8002/api/v1/faults?start_date=${startDateISO}&end_date=${endDateISO}&page_size=5`;
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

  prepareChartData() {
    const serialMap = new Map<
      string,
      { prediction1: number; prediction0: number }
    >();

    // Loop through the faults data
    this.faults.forEach((fault) => {
      console.log(fault);
      const serialNumber = fault?.data?.serial_number;
      const prediction = fault?.prediction;
      console.log(serialNumber);
      console.log(prediction);

      if (serialNumber && prediction !== undefined) {
        if (!serialMap.has(serialNumber)) {
          serialMap.set(serialNumber, { prediction1: 0, prediction0: 0 });
        }
        const data = serialMap.get(serialNumber);

        // Increase the count based on the prediction value
        if (prediction === 1) {
          data.prediction1++;
        } else if (prediction === 0) {
          data.prediction0++;
        }
      }
    });
    console.log(serialMap);
    // Prepare the data for the chart
    this.serialNumbers = Array.from(serialMap.keys());
    this.predictionData.prediction1 = this.serialNumbers.map(
      (serial) => serialMap.get(serial)?.prediction1 || 0
    );
    this.predictionData.prediction0 = this.serialNumbers.map(
      (serial) => serialMap.get(serial)?.prediction0 || 0
    );
  }
  // Function to return color based on prediction
  getColor(prediction: number): string {
    return prediction === 1 ? "#00A307" : "#FD9800"; // Green for prediction=1, Orange for prediction=0
  }
}
