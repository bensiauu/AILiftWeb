import { Component, Input } from '@angular/core';
import { Trip } from '../dashboard/interfaces/trip.interface';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent {
    @Input() public trip: Trip = {
        date: '',
        lift_id: '',
        lbb_data: [],
        lmd_data: [],
        trip_num: 0
    };
    
    
    getTimeFromTimestamp(timestamp: string): string {
        const timestampWithoutMicroseconds = timestamp.split(':')[0] + ':' + timestamp.split(':')[1] + ':' + timestamp.split(':')[2];
        const date = new Date(timestampWithoutMicroseconds);
        if (isNaN(date.getTime())) {
            return 'wrong';
          }
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${hours}:${minutes}:${seconds}`;
      }
}
