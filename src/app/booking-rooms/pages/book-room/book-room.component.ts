import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';
import { Observable } from 'rxjs';
import { Room } from '../../models/room';
import { BookingsService } from '../../services/bookings.service';
import moment from 'moment';
import { Slot } from '../../models/slot';
import { Booking } from '../../models/booking';
import { Team } from '../../models/team';
import { TeamsService } from '../../services/teams.service';
import { SlotEnum } from '../../utils/slot-enum';

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
  messageError: string | undefined = undefined;

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
    this.messageError = '';
    this.slots = slots.map((slot, index) => ({
      ...slot,
      booked: index === indexSlot ? !slot.booked : slot.booked
    }));
    this.selectedSlot = this.slots[indexSlot];
  }

  createBookingInput() {
    const selectedSlot = this.slots.find((slot) => slot.slot === this.selectedSlot?.slot);
    const isSelectedSlotBooked = selectedSlot?.booked || false;

    const morningBooked = selectedSlot?.slot === SlotEnum.Morning ? isSelectedSlotBooked : false;
    const afternoonBooked = selectedSlot?.slot === SlotEnum.Afternoon ? isSelectedSlotBooked : false;
    const allDayBooked = selectedSlot?.slot === SlotEnum.AllDay ? isSelectedSlotBooked : false;

    return {
      roomId: this.roomId,
      teamId: this.selectedTeam?._id,
      day: this.formattedDate,
      morningBooked,
      afternoonBooked,
      allDayBooked,
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
        this.messageError = error.error.error;
        this.freeSlots$ = this.bookingsService.getFreeSlotsForRoom(this.roomId, this.formattedDate, this.selectedTeam?._id)
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
    this.messageError = '';
    if (this.formattedDate)
      this.freeSlots$ = this.bookingsService.getFreeSlotsForRoom(this.roomId, this.formattedDate, this.selectedTeam?._id)
  }

}
