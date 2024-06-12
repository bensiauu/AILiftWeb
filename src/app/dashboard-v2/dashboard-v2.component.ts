import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValueAxisLabels } from '@progress/kendo-angular-charts';

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './dashboard-v2.component.html',
  styleUrls: ['./dashboard-v2.component.scss']
})
export class DashboardV2Component {
    constructor(private router: Router) {}
    

    lifts = [
      { name: 'S0160L01A', condition: 'Normal', confidence: '40%', status: 'normal', direction: 'down', predictionTime: '' },
      { name: 'S0160L03A', condition: 'Normal', confidence: '50%', status: 'normal', direction: 'up', predictionTime: '' },
      { name: 'S0160L04A', condition: 'Faulty', confidence: '60%', status: 'faulty', direction: 'up', predictionTime: '' },
      { name: 'S0160L05A', condition: 'Maintenance', confidence: '10%', status: 'maintenance', direction: 'down', predictionTime: '' }
    ];

    public pieData = [
        { category: "Healthy", value:0.75, valueColor: 'green' },
        { category: "Faulty", value: 0.05, valueColor: 'red' },
        { category: "Under Maintenance", value: 0.15, valueColor: 'orange' },
        { category: "Offline", value: 0.05, valueColor: 'gray' },
      ];
      

    public faults = [
        { name: 'Fault 1', date: '2024-02-29 10:33am' },
        { name: 'Fault 2', date: '2024-03-01 02:15pm' },
        { name: '', date: '' },
        { name: '', date: '' },
        { name: '', date: '' },
        
        
      ];  


    ngOnInit() {
      const now = new Date().toISOString();
      this.selectedLift = this.lifts[0]
      this.lifts.forEach(lift => {
        lift.predictionTime = now;
      });
    }

    public selectedLift: any = null;

  selectLift(lift: any) {
    this.selectedLift = lift;
  }

  isSelected(lift: any) {
    return this.selectedLift === lift;
  }

}
