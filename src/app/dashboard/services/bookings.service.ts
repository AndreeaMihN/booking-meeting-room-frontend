import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking';
import { Observable } from 'rxjs';
import { Slot } from '../models/slot';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  apiURLBookings = environment.apiUrl + 'bookings';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiURLBookings);
  }

  getFreeSlotsForRoom(roomId: string, day: string): Observable<Slot[]> {
    return this.http.get<Slot[]>(`${this.apiURLBookings}/${roomId}/${day}`);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiURLBookings}`, booking);
  }

}
