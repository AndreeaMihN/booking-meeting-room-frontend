import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';
import { Observable, mergeMap } from 'rxjs';
import { Room } from '../../models/room';
import { BookingsService } from '../../services/bookings.service';
import moment from 'moment';
import { Slot } from '../../models/slot';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrl: './book-room.component.scss'
})
export class BookRoomComponent implements OnInit {
  room$: Observable<Room> = new Observable<Room>();
  freeSlots$: Observable<Slot[]> = new Observable<Slot[]>();
  selectedSlot!: Slot;
  formattedDate!: string;
  roomId!: string;
  slots: Slot[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private roomsService: RoomsService, private bookingsService: BookingsService) {
  }

  ngOnInit(): void {
    this.roomId = this.activatedRoute.snapshot.params['id'];
    this.room$ = this.roomsService.getRoom(this.roomId);
  }

  // handleSlotClick(indexSlot: number, slots: Slot[]) {
  //   this.selectedSlot = slots[indexSlot];
  //   this.slots = slots;
  //   this.slots[indexSlot].booked = true;
  // }

  handleSlotClick(indexSlot: number, slots: Slot[]) {
    this.slots = slots;
    this.slots[indexSlot].booked = !slots[indexSlot].booked;
    const clickedSlot = slots[indexSlot];
    if (clickedSlot.booked) return; // Prevent selecting booked slots
    this.selectedSlot = clickedSlot;
  }

  createBookingInput(){
    if (!this.slots.length) {
      return {
        roomId: this.roomId,
        day: this.formattedDate,
        morningBooked: false,
        afternoonBooked: false,
        allDayBooked: false,
      };
    }

    return {
      roomId: this.roomId,
      day : this.formattedDate,
      morningBooked: this.slots[0].booked,
      afternoonBooked: this.slots[1].booked,
      allDayBooked: this.slots[2].booked,
    } as Booking;
  }

  createBookingAndRefreshSlots(slots: Slot[]) {
    const booking = this.createBookingInput();
    this.bookingsService.createBooking(booking).subscribe(
      () => {
        this.router.navigate(['/bookings']);
      },
      (error) => {
        console.error('Error creating booking:', error);
      }
    );
  }

  handleDateSelection(event: any) {
    let selectedDate = event.value;
    const momentDate = moment(selectedDate);
    this.formattedDate = momentDate.format('YYYY-MM-DD');
    this.freeSlots$ = this.bookingsService.getFreeSlotsForRoom(this.roomId, this.formattedDate)
  }

}
