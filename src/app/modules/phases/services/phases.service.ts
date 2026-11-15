// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Tournament } from '../interfaces/data';
@Injectable({
  providedIn: 'root'
})

export class PhasesService {

  private apiUrl = 'http://127.0.0.1:8000/api/phases';

  private apiUrl2 = 'http://127.0.0.1:8000/api/tournaments';

  constructor(private http: HttpClient) { }

  // 1. Obtener el listado general de torneos
  getTournaments(): Observable<ApiResponse<Tournament[]>> {
    return this.http.get<ApiResponse<Tournament[]>>(`${this.apiUrl2}`);
  }
  // getTournaments(): Observable<Tournament[]> {
  //   return this.http.get<Tournament[]>(`${this.apiUrl}/tournaments`);
  // }

  // 2. Obtener un torneo específico con sus fases (al hacer clic en el botón "Ver / Ojo")
  getPhasesByTournamentId(tournamentId: number): Observable<ApiResponse<Tournament>> {
    return this.http.get<ApiResponse<Tournament>>(`${this.apiUrl}/${tournamentId}`);

  }

}
