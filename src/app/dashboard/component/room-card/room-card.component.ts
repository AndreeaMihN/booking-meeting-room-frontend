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
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();
  //@Output() bookRoomEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor(private router: Router){

  }

  deleteRoom(id:string){
    this.deleteEvent.emit(id);
  }

  bookRoom(id:string){
    //this.bookRoomEvent.emit(id);
    console.log(id)
    this.router.navigate(['dashboard/rooms/book', id]);
  }
}
