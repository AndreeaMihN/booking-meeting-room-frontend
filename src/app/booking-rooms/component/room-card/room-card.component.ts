import { Component, Input } from '@angular/core';
import { Room } from '../../models/room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss'
})
export class RoomCardComponent {
  @Input() room: Room | undefined;
  constructor(private router: Router) {
  }

  bookRoom(id: string) {
    this.router.navigate(['booking/rooms/book', id]);
  }
}
