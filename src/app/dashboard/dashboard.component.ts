import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from './interfaces/trip.interface';
import { ListViewModule } from '@progress/kendo-angular-listview';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  liftData: Trip[] = [];
  firstAndLastTimestamps: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Trip[]>('http://127.0.0.1:5000/api/trips').subscribe(data => {
      this.liftData = data['trips'];
      this.extractFirstAndLastTimestamps();
    });
  }

  extractFirstAndLastTimestamps(): void {
    if (this.liftData.length > 0 && this.liftData[0].lbb_data?.length > 0) {
      const trip = this.liftData[0];
      const firstTimestamp = trip.lbb_data[0]?.timestamp;
      const lastTimestamp = trip.lbb_data[trip.lbb_data.length - 1]?.timestamp;
      this.firstAndLastTimestamps = [firstTimestamp, lastTimestamp];
    }
  }

  get categoryAxis(): any {
    return {
        labels: {
            content: (e: any) => {
                const index = e.index;
                if (index === 0) {
                    return this.firstAndLastTimestamps[0];
                } else if (index === this.liftData[0].lbb_data.length - 1) {
                    return this.firstAndLastTimestamps[1];
                }
                return '';
            }
        }
    }
}
}
