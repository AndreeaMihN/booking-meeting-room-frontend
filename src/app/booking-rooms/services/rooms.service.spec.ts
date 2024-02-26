import { TestBed } from '@angular/core/testing';

import { RoomsService } from './rooms.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Room } from '../models/room';
import { environment } from '../../environments/environments';
import { Office } from '../models/office';

describe('RoomsService', () => {
  let service: RoomsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoomsService]
    });
    service = TestBed.inject(RoomsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of rooms', () => {
    const mockRooms: Room[] = [
      { _id: '1', name: 'Room 1', description: 'Description 1', capacity: 10, office: {} as Office, imageUrl: 'image1.jpg', floor: 1 },
      { _id: '2', name: 'Room 2', description: 'Description 2', capacity: 8, office: {} as Office, imageUrl: 'image2.jpg', floor: 2 }
    ];

    service.getRooms().subscribe((rooms: Room[]) => {
      expect(rooms).toEqual(mockRooms);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}rooms`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockRooms);
  });

  it('should return a specific room', () => {
    const roomId = '1';
    const mockRoom: Room = { _id: '1', name: 'Room 1', description: 'Description 1', capacity: 10, office: {} as Office, imageUrl: 'image1.jpg', floor: 1 };

    service.getRoom(roomId).subscribe((room: Room) => {
      expect(room).toEqual(mockRoom);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}rooms/${roomId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockRoom);
  });
});
