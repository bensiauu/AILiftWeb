import { Component, Input } from '@angular/core';
import { Trip } from '../dashboard/interfaces/trip.interface';
import { parseCustomTimestamp } from '../utils/date-utils';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent {
    @Input() public trip!: Trip;

    getTimeFromTimestamp(timestamp: string | Date): string {
        const date = parseCustomTimestamp(timestamp);
        return date.toLocaleTimeString();
      }
}
