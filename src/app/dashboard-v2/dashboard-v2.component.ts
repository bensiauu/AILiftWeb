import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-dashboard-v2",
    templateUrl: "./dashboard-v2.component.html",
    styleUrls: ["./dashboard-v2.component.scss"],
})
export class DashboardV2Component {
    constructor(private router: Router) { }

    lifts = [
        {
            name: "S0160L01A",
            condition: "Normal",
            confidence: "40%",
            status: "normal",
            direction: "down",
            predictionTime: "",
        },
        {
            name: "S0160L03A",
            condition: "Normal",
            confidence: "50%",
            status: "normal",
            direction: "up",
            predictionTime: "",
        },
        {
            name: "S0160L04A",
            condition: "Faulty",
            confidence: "60%",
            status: "faulty",
            direction: "up",
            predictionTime: "",
        },
        {
            name: "S0160L05A",
            condition: "Maintenance",
            confidence: "10%",
            status: "maintenance",
            direction: "down",
            predictionTime: "",
        },
    ];

    public pieData = [
        { category: "Healthy", value: 0.75, valueColor: "green" },
        { category: "Faulty", value: 0.05, valueColor: "red" },
        { category: "Under Maintenance", value: 0.15, valueColor: "orange" },
        { category: "Offline", value: 0.05, valueColor: "gray" },
    ];

    public selectedLift: any = null;

    ngOnInit() {
        const now = new Date().toISOString();
        this.selectedLift = this.lifts[0];
        this.lifts.forEach((lift) => {
            lift.predictionTime = now;
        });
    }


    navigateToLiftDetails(liftName: string) {
        this.router.navigate(["/lift-details", liftName]);
    }
}
