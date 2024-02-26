import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { BookingDetails } from '../../models/bookingDetails';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit {
  bookings$: Observable<BookingDetails[]> = new Observable<BookingDetails[]>();
  selectedRow: number | undefined;
  selectedBooking: BookingDetails | undefined;
  isDetailsVisible = false;
  morningFilter: string = 'all';
  afternoonFilter: string = 'all';
  filteredBookings: BookingDetails[] = [];

  constructor(private bookingsService: BookingsService) {
  }
  ngOnInit(): void {
    this.bookings$ = this.bookingsService.getBookings();
    this.bookings$.subscribe(bookings => {
      this.filteredBookings = bookings;
    });
  }

  toggleDetails(index: number, booking: BookingDetails): void {
    if (this.selectedRow === index) {
      this.isDetailsVisible = !this.isDetailsVisible;
    } else {
      this.selectedRow = index;
      this.selectedBooking = booking;
      this.isDetailsVisible = true;
    }
  }

  applyFilter(): void {
    this.bookingsService.getBookings().subscribe(bookings => {
      this.filteredBookings = bookings.filter(booking =>
        (this.morningFilter === 'all' || booking.morningBooked === (this.morningFilter === 'true')) &&
        (this.afternoonFilter === 'all' || booking.afternoonBooked === (this.afternoonFilter === 'true'))
      );
    });
  }


}
