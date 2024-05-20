import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip,LBBData } from './interfaces/trip.interface';
import { parseCustomTimestamp } from '../utils/date-utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  liftData: Trip[] = [];
  firstAndLastTimestamps: string[] = [];
  selectedTrip: Trip | null = null;
  aggregatedLBBData: LBBData[] = [];

  normal = {
    width: 2,
    color: '#ff6358'
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Trip[]>('http://127.0.0.1:5000/api/trips').subscribe(data => {
      this.liftData = data['trips'];

      if (this.liftData.length > 0) {
        this.selectedTrip = this.liftData[0]; // Select the most recent trip by default
        this.aggregatedLBBData = this.aggregateData(this.selectedTrip.lbb_data)
      }
    });
  }

  categoryAxis = {
    labels: {
      rotation: "auto", // Rotate labels 45 degrees counter-clockwise
      step: 10, // Display every 10th label
      margin: {
        left: 10
      },
      content: (e: any) => {
        const date = new Date(e.value);
        return date.toTimeString().split(' ')[0];
      },
      position: "start"
    },
    title: { text: 'Timestamp' }
  };

  valueAxis = {
    title: { text: 'Values' },
    labels: {
      format: '{0}'
    },
    min: null, // Automatically calculate the minimum value to include negative values
    max: null,  // Automatically calculate the maximum value
    line: {
        visible: true
      }
    };

    selectTrip(trip: Trip): void {
        this.selectedTrip = trip;
        this.aggregatedLBBData = this.aggregateData(trip.lbb_data);
    }

    aggregateData(data: LBBData[], interval: number = 300): LBBData[] {
        const aggregated: LBBData[] = [];
        let sumX = 0, sumY = 0, sumZ = 0, count = 0;
        let currentIntervalStart = parseCustomTimestamp(data[0].timestamp).getTime();
    
        data.forEach(point => {
          const timestamp = parseCustomTimestamp(point.timestamp).getTime();
          if (timestamp - currentIntervalStart < interval) {
            sumX += point.x;
            sumY += point.y;
            sumZ += point.z;
            count++;
          } else {
            aggregated.push({
              timestamp: new Date(currentIntervalStart).toISOString(),
              x: sumX / count,
              y: sumY / count,
              z: sumZ / count
            });
            currentIntervalStart = timestamp;
            sumX = point.x;
            sumY = point.y;
            sumZ = point.z;
            count = 1;
          }
        });
    
        if (count > 0) {
          aggregated.push({
            timestamp: new Date(currentIntervalStart).toISOString(),
            x: sumX / count,
            y: sumY / count,
            z: sumZ / count
          });
        }
        console.log(aggregated[0].timestamp)
        return aggregated;
      }
}
