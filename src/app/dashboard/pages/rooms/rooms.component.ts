import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../models/room';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {;
  rooms$: Observable<Room[]> = new Observable<Room[]>();
  constructor(private roomsService: RoomsService){
    console.log('here RoomsComponent')
  }
  ngOnInit(): void {
    this.rooms$ = this.roomsService.getRooms();
  }

  bookRoom($event: string){

  }

  deleteRoom($event: string){

  }
}
