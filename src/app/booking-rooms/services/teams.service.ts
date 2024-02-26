import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/team';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  apiURLTeams = environment.apiUrl + 'teams';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiURLTeams);
  }

  getTeam(teamId: string): Observable<Team> {
    return this.http.get<Team>(`${this.apiURLTeams}/${teamId}`);
  }
}
