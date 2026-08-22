import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Banners } from '../interfaces/data';
import { map } from 'rxjs/operators'; // <-- Importa el operador map
@Injectable({
  providedIn: 'root'
})
export class BannersService {

  private apiUrl = 'http://127.0.0.1:8000/api/banners';

  // URL base para acceder a la carpeta pública del storage de Laravel
  public storageUrl = 'http://127.0.0.1:8000/storage/';

  constructor(private http: HttpClient) { }

  getBanners(): Observable<Banners[]> {
    // 2. Si se pasan filtros, construimos los Query Params

    // 1. Hacemos la petición esperando la forma de la ApiResponse
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      // 2. Aquí pelamos el objeto y retornamos solo la propiedad 'data'
      map(response => response.data)
    );
  }
}
