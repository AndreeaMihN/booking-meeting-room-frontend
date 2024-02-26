import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';
import { Observable } from 'rxjs';
import { Room } from '../../models/room';
import { BookingsService } from '../../services/bookings.service';
import moment from 'moment';
import { Slot } from '../../models/slot';
import { Booking } from '../../models/booking';
import { Team } from '../../models/team';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrl: './book-room.component.scss'
})
export class BookRoomComponent implements OnInit {
  room$: Observable<Room> = new Observable<Room>();
  teams$: Observable<Team[]> = new Observable<Team[]>();
  freeSlots$: Observable<Slot[]> = new Observable<Slot[]>();
  selectedSlot: Slot | undefined = undefined;
  formattedDate!: string;
  roomId!: string;
  slots: Slot[] = [];
  selectedTeam!: Team;
  messageError: string | undefined= undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private roomsService: RoomsService,
    private bookingsService: BookingsService,
    private teamsService: TeamsService
    ) {
  }

  ngOnInit(): void {
    this.roomId = this.activatedRoute.snapshot.params['id'];
    this.room$ = this.roomsService.getRoom(this.roomId);
    this.teams$ = this.teamsService.getTeams();
  }

  handleSlotClick(indexSlot: number, slots: Slot[]) {
    this.slots = slots.map(slot => ({ ...slot }));
    this.slots[indexSlot].booked = !this.slots[indexSlot].booked;
    this.selectedSlot = this.slots[indexSlot];
  }

  createBookingInput(){
    if (!this.slots.length) {
      return {
        roomId: this.roomId,
        teamId: this.selectedTeam?._id,
        day: this.formattedDate,
        morningBooked: false,
        afternoonBooked: false,
        allDayBooked: false,
      };
    }

    return {
      roomId: this.roomId,
      teamId: this.selectedTeam?._id,
      day : this.formattedDate,
      morningBooked: this.slots[0].booked,
      afternoonBooked: this.slots[1].booked,
      allDayBooked: this.slots[2].booked,
    } as Booking;
  }

  updateSlot() {
    this.messageError = '';
    const booking = this.createBookingInput();
    this.bookingsService.createBooking(booking).subscribe(
      () => {
        this.freeSlots$ = this.bookingsService.getFreeSlotsForRoom(this.roomId, this.formattedDate, this.selectedTeam?._id)
      },
      (error) => {
        console.error('Error creating booking:', error);
        this.messageError = error.error;
      }
    );
  }

  handleDateSelection(event: any) {
    let selectedDate = event.value;
    const momentDate = moment(selectedDate);
    this.formattedDate = momentDate.format('YYYY-MM-DD');
    this.freeSlots$ = this.bookingsService.getFreeSlotsForRoom(this.roomId, this.formattedDate, this.selectedTeam?._id)
  }

  handleTeamChange() {
    console.log('selected team changed: ',this.selectedTeam)
    if(this.formattedDate)
    this.freeSlots$ = this.bookingsService.getFreeSlotsForRoom(this.roomId, this.formattedDate, this.selectedTeam?._id)
  }

}
