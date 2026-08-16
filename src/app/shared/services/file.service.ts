import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = 'http://127.0.0.1:8000/api/files';

  constructor(private http: HttpClient) { }

  // Retorna un Observable<number> con el file_id
  public subirArchivo(file: File): Observable<number> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl, formData).pipe(
      map(res => res.file_id ?? res.id)
    );
  }
}