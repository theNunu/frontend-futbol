import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class TournamentService {
    private apiUrl = 'http://127.0.0.1:8000/api';

    constructor(private http: HttpClient) { }

    getTest(): Observable<any> {
        return this.http.get(`${this.apiUrl}/test`);
    }

    getTournaments(): Observable<any> {
        return this.http.get(`${this.apiUrl}/tournaments`);
    }



    //   private apiUrl = 'https://fakestoreapi.com/products';

    //   constructor(private http: HttpClient) { }

    //   getProducts() {
    //     return this.http.get(this.apiUrl);
    //   }

    //   getProductById(id: number) {
    //     return this.http.get(`${this.apiUrl}/${id}`);
    //   }

}