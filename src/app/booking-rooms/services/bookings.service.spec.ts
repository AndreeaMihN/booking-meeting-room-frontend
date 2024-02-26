import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookingsService } from './bookings.service';
import { Booking } from '../models/booking';
import { Slot } from '../models/slot';
import { BookingDetails } from '../models/bookingDetails';
import { Office } from '../models/office';
import { environment } from '../../environments/environments';

describe('BookingsService', () => {
  let service: BookingsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingsService]
    });
    service = TestBed.inject(BookingsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get bookings', () => {
    const mockBookings: BookingDetails[] = [
      {
        roomId: { _id: '1', name: 'Room 1', description: 'Description 1', capacity: 10, office: {} as Office, imageUrl: 'image1.jpg', floor: 1 },
        teamId: { _id: '1', name: 'Team 1', numberOfMembers: 5 },
        day: new Date(),
        morningBooked: true,
        afternoonBooked: false,
        allDayBooked: false
      },
    ];

    service.getBookings().subscribe((bookings: BookingDetails[]) => {
      expect(bookings).toEqual(mockBookings);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}bookings`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockBookings);
  });

  it('should get free slots for room', () => {
    const roomId = '1';
    const day = '2022-02-28';
    const teamId = '1';
    const mockSlots: Slot[] = [
      { slot: '1', booked: true },
      { slot: '2', booked: false }
    ];

    service.getFreeSlotsForRoom(roomId, day, teamId).subscribe((slots: Slot[]) => {
      expect(slots).toEqual(mockSlots);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}bookings/${roomId}/${day}/${teamId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockSlots);
  });

  it('should create a booking', () => {
    const mockBooking: Booking = {
      roomId: '1',
      teamId: '1',
      morningBooked: true,
      afternoonBooked: false,
      allDayBooked: false
    };

    service.createBooking(mockBooking).subscribe((booking: Booking) => {
      expect(booking).toEqual(mockBooking);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}bookings`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockBooking);
    req.flush(mockBooking);
  });
});
