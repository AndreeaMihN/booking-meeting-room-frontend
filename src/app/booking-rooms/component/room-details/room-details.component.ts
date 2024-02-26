import { Component, Input } from '@angular/core';
import { Room } from '../../models/room';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent {
  @Input() room!: Room;

}
