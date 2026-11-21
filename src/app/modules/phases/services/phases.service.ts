// import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Phase, PhaseCreatePayload, PhaseFilterParams, Tournament, TournamentDetailResponse, TournamentsList } from '../interfaces/data';
@Injectable({
  providedIn: 'root'
})

export class PhasesService {

  private apiUrl = 'http://127.0.0.1:8000/api/phases';

  private apiUrl2 = 'http://127.0.0.1:8000/api/tournaments';

  constructor(private http: HttpClient) { }

  // 1. Obtener el listado general de torneos
  getPhases(filters: PhaseFilterParams): Observable<ApiResponse<Phase[]>> {

    let params = new HttpParams();

    // OPCIÓN A: Si el backend requiere que los parámetros SE ENVÍEN SIEMPRE (aunque vayan vacíos)
    params = params.set('tournamentId', filters.tournamentId !== null && filters.tournamentId !== undefined ? filters.tournamentId.toString() : '');
    params = params.set('name', filters.name ?? '');
    return this.http.get<ApiResponse<Phase[]>>(`${this.apiUrl}`, { params });
  }
  getTournaments(): Observable<ApiResponse<TournamentsList[]>> {
    return this.http.get<ApiResponse<TournamentsList[]>>(`${this.apiUrl2}`);
  }

  // 2. Obtener un torneo específico con sus fases (al hacer clic en el botón "Ver / Ojo")
  getPhasesByTournamentId(tournamentId: number): Observable<ApiResponse<Tournament>> {
    return this.http.get<ApiResponse<Tournament>>(`${this.apiUrl}/${tournamentId}`);

  }

  // Método para actualizar una fase existente (PUT)
  updatePhase(phaseId: number, payload: PhaseCreatePayload): Observable<ApiResponse<TournamentDetailResponse>> {
    return this.http.put<ApiResponse<TournamentDetailResponse>>(`${this.apiUrl}/${phaseId}`, payload);
  }

}
