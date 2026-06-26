import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { ApiResponse, dtoNews, News } from '../../interfaces/data';
import { map } from 'rxjs/operators'; // <-- Importa el operador map
import { ApiResponse, dtoNews, FiltrosNews, News } from '../interfaces/data';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'http://127.0.0.1:8000/api/news';

  constructor(private http: HttpClient) { }

  // Agrupamos los filtros en un solo objeto tipado
  public filtros: FiltrosNews = {
    title: '',
    is_active: ''
  };

  // getNews(): Observable<News[]> {
  //   return this.http.get<News[]>(`${this.apiUrl}`);
  // }
  // El componente pide una lista de News[], y eso es exactamente lo que le daremos
  getNews(filtros?: FiltrosNews): Observable<News[]> {
    let params = new HttpParams();

    // 2. Si se pasan filtros, construimos los Query Params
    if (filtros) {
      if (filtros.title && filtros.title.trim() !== '') {
        params = params.set('title', filtros.title);
      }
      // Evaluamos que no sea vacío, null o undefined
      if (filtros.is_active !== undefined && filtros.is_active !== null && filtros.is_active !== '') {
        params = params.set('is_active', filtros.is_active.toString());
      }
    }

    // 1. Hacemos la petición esperando la forma de la ApiResponse
    return this.http.get<ApiResponse>(this.apiUrl, { params }).pipe(
      // 2. Aquí pelamos el objeto y retornamos solo la propiedad 'data'
      map(response => response.data)
    );
  }

  //   cargarUsuarios(): void {
  //   // Pasamos el objeto directamente ya que cumple con la interfaz exigida
  //   this.usuarioService.obtenerUsuarios(this.filtros).subscribe({
  //     next: (response: ApiResponse) => {
  //       this.usuarios = response.data;
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }

  // Método profesional para crear una noticia
  // createNews(newsData: Partial<News>): Observable<News> {
  //   return this.http.post<ApiResponse>(this.apiUrl, newsData).pipe(
  //     map(response => response.data) // Asumiendo que retorna la noticia creada en .data
  //   );
  // }

  createNews(request: dtoNews) {
    console.log("request del servidor: ", request)
    return this.http.post<dtoNews>(`${this.apiUrl}`, request);
  }
}
