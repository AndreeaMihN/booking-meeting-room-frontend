import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../models/room';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
  rooms$: Observable<Room[]> = new Observable<Room[]>();
  filteredRooms: Room[] = [];
  searchQuery: string = '';

  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {
    this.rooms$ = this.roomsService.getRooms();
    this.rooms$.subscribe(rooms => this.filteredRooms = rooms);
  }

  filterRooms(): void {
    if (this.searchQuery.trim() !== '') {
      this.filteredRooms = this.filteredRooms.filter(room =>
        room.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.rooms$.subscribe(rooms => this.filteredRooms = rooms);
    }
  }
}
