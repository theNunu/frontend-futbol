import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, SeasonDto, SeasonI } from '../interfaces/data';
// import { ApiResponse, RequestDto, Season } from '../interfaces/data';
// import { RequestDto, Tournament } from '../interfaces/data';

@Injectable({
    providedIn: 'root'
})
export class SeasonService { //. Módulo Dominio / Módulo Funcional

    private apiUrl = 'http://127.0.0.1:8000/api/seasons';

    constructor(private http: HttpClient) { }

    getSeasons(): Observable<SeasonI[]> {
        return this.http.get<SeasonI[]>(`${this.apiUrl}`);
    }

    getSeasonById(seasonId: number): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiUrl}/${seasonId}`);
    }

    postSeason(request: SeasonDto) {
        console.log("request del servidor: ", request)
        return this.http.post<SeasonDto>(`${this.apiUrl}`, request);
    }

    updateSeason(seasonId: number, request: SeasonDto): Observable<any> {
        // console.log("request del servidor: ", request)
        // return this.http.post<SeasonDto>(`${this.apiUrl}`, request);
        return this.http.put(`${this.apiUrl}/${seasonId}`, request);
    }

    changeStatus(id: number, status: boolean): Observable<any> {
        // Ajusta la URL según tu backend, ej: /seasons/1/status
        return this.http.patch(`${this.apiUrl}/${id}/`, { active: status });
    }

    // updateTournament(tournamentId: number, request: RequestDto): Observable<any> {
    //   return this.http.put(`${this.apiUrl}/${tournamentId}`, request);
    // }

}
