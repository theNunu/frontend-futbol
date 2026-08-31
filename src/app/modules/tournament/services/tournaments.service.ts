import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Tournaments } from '../interfaces/data';
import { map } from 'rxjs/operators'; // <-- Importa el operador map
@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private apiUrl = 'http://127.0.0.1:8000/api/tournaments';

  constructor(private http: HttpClient) { }

  getTournaments(): Observable<Tournaments[]> {

    // 1. Hacemos la petición esperando la forma de la ApiResponse
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      // 2. Aquí pelamos el objeto y retornamos solo la propiedad 'data'
      map(response => response.data)
    );
  }
}
