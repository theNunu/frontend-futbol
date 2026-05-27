import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../../interfaces/data';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'http://127.0.0.1:8000/api/news';

  constructor(private http: HttpClient) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}`);
  }
}
