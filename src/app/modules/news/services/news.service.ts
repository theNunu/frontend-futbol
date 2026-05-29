import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, News } from '../../interfaces/data';
import { map } from 'rxjs/operators'; // <-- Importa el operador map
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'http://127.0.0.1:8000/api/news';

  constructor(private http: HttpClient) { }

  // getNews(): Observable<News[]> {
  //   return this.http.get<News[]>(`${this.apiUrl}`);
  // }
  // El componente pide una lista de News[], y eso es exactamente lo que le daremos
  getNews(): Observable<News[]> {
    // 1. Hacemos la petición esperando la forma de la ApiResponse
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      // 2. Aquí pelamos el objeto y retornamos solo la propiedad 'data'
      map(response => response.data)
    );
  }
}
