import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestDto, Season } from '../interfaces/data';
// import { RequestDto, Tournament } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  private apiUrl = 'http://127.0.0.1:8000/api/seasons';

  constructor(private http: HttpClient) { }

  getSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.apiUrl}`);
  }

  getSeasonById(seasonId: number) {
    return this.http.get(`${this.apiUrl}/${seasonId}`);
  }

  postSeason(request: RequestDto) {
    return this.http.post<any>(`${this.apiUrl}`, request);
  }

  // En tournament.service.ts
  deleteSeason(seasonId: number) {
    return this.http.delete(`${this.apiUrl}/${seasonId}`);
  }

  // En tournament.service.ts
  updateTournament(seasonId: number, request: RequestDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${seasonId}`, request);
  }



}
