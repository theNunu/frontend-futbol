import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestDto, Tournament } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private apiUrl = 'http://127.0.0.1:8000/api/tournaments';

  constructor(private http: HttpClient) { }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.apiUrl}`);
  }

  getTournamentById(tournamentId: number) {
    return this.http.get(`${this.apiUrl}/${tournamentId}`);
  }

  //  postTournament(request: any) {
  //   return this.http.post(
  //     `${this.apiUrl}`, request );
  // }

  postTournament(request: RequestDto) {
  return this.http.post<any>(`${this.apiUrl}`, request);
}

// En tournament.service.ts
deleteTournament(tournamentId: number) {
  return this.http.delete(`${this.apiUrl}/${tournamentId}`);
}

  


}
