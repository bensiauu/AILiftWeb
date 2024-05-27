import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './dashboard-v2.component.html',
  styleUrls: ['./dashboard-v2.component.scss']
})
export class DashboardV2Component {
    hoveredLift: any = null;
    currentTime: string = '';
    predictionPeriod: string = '';
  
    constructor(private router: Router) {}


    lifts = [
      { name: 'S0160L04A', condition: 'Faulty', confidence: '60%', status: 'faulty', direction: 'up', predictionTime: '' },
      { name: 'S0160L01A', condition: 'Normal', confidence: '40%', status: 'normal', direction: 'down', predictionTime: '' },
      { name: 'S0160L03A', condition: 'Normal', confidence: '50%', status: 'normal', direction: 'up', predictionTime: '' },
      { name: 'S0160L05A', condition: 'Maintenance', confidence: '10%', status: 'maintenance', direction: 'down', predictionTime: '' }
    ];
  
    ngOnInit() {
      const now = new Date().toISOString();
      this.currentTime = now;
      this.predictionPeriod = new Date(Date.now() - 60000).toISOString(); // 1 minute ago
      this.lifts.forEach(lift => {
        lift.predictionTime = now;
      });
    }

  onHoverLift(lift: any) {
    this.hoveredLift = lift;
  }

  onLeaveLift() {
    this.hoveredLift = null;
  }

  navigateToLiftDetails(liftName: string) {
    this.router.navigate(['/lift-details', liftName]);
  }
}
