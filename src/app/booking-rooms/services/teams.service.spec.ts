import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TeamsService } from './teams.service';
import { Team } from '../models/team';

describe('TeamsService', () => {
  let service: TeamsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamsService]
    });
    service = TestBed.inject(TeamsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve teams from the API via GET', () => {
    const mockTeams: Team[] = [
      { _id: '1', name: 'Team 1', numberOfMembers: 20 },
      { _id: '2', name: 'Team 2', numberOfMembers: 10 },
    ];

    service.getTeams().subscribe(teams => {
      expect(teams.length).toBe(2);
      expect(teams).toEqual(mockTeams);
    });

    const req = httpMock.expectOne(`${service.apiURLTeams}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeams);
  });

  it('should retrieve a single team from the API via GET', () => {
    const teamId = '1';
    const mockTeam: Team = { _id: teamId, name: 'Team 1', numberOfMembers: 20 };

    service.getTeam(teamId).subscribe(team => {
      expect(team).toEqual(mockTeam);
    });

    const req = httpMock.expectOne(`${service.apiURLTeams}/${teamId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeam);
  });
});
