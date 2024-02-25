import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  apiURLRooms = environment.apiUrl + 'rooms';

  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiURLRooms);
  }

  getRoom(roomId: string): Observable<Room> {
    return this.http.get<Room>(`${this.apiURLRooms}/${roomId}`);
  }
}
