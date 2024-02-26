import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '../../models/room';
import { Route, Router } from '@angular/router';

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
    this.router.navigate(['dashboard/rooms/book', id]);
  }
}
