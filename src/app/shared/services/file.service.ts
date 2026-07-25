import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { ApiResponse, dtoNews, News } from '../../interfaces/data';
import { map } from 'rxjs/operators'; // <-- Importa el operador map
@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient) { }

    private apiUrl = 'http://127.0.0.1:8000/api/files';

    public subirArchivo(file: File): Promise<number> {
        const formData = new FormData();
        formData.append('file', file); // 'file' coincide con $request->file('file') en Laravel

        return new Promise((resolve, reject) => {
            console.log('mi archivo', formData)
            this.http.post<any>(`${this.apiUrl}`, formData).subscribe({

                next: (res) => resolve(res.file_id), // Retornamos el ID devuelto por FileController
                error: (err) => reject(err)
            });
        })

    }
}
