// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Tournament, TournamentDetailResponse, TournamentsListResponse } from '../interfaces/data';
@Injectable({
  providedIn: 'root'
})

export class PhasesService {

  private apiUrl = 'http://127.0.0.1:8000/api/phases';

  private apiUrl2 = 'http://127.0.0.1:8000/api/tournaments';

  constructor(private http: HttpClient) { }

  // 1. Obtener el listado general de torneos
  getTournaments(): Observable<ApiResponse<TournamentsListResponse>> {
    return this.http.get<ApiResponse<TournamentsListResponse>>(`${this.apiUrl2}`);
  }
  // getTournaments(): Observable<Tournament[]> {
  //   return this.http.get<Tournament[]>(`${this.apiUrl}/tournaments`);
  // }

  // 2. Obtener un torneo específico con sus fases (al hacer clic en el botón "Ver / Ojo")
  getTournamentById(tournamentId: number): Observable<ApiResponse<TournamentDetailResponse>> {
    return this.http.get<ApiResponse<TournamentDetailResponse>>(`${this.apiUrl}/${tournamentId}`);

  }

}
