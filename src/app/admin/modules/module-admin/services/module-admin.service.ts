import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModuleItem } from '../interfaces/module-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleAdminService {

  // constructor() { }

  private apiUrl = 'http://127.0.0.1:8000/api/modules';

  constructor(private http: HttpClient) { }

  getSidebarMenu(): Observable<ModuleItem[]> {
    return this.http.get<ModuleItem[]>(`${this.apiUrl}`);
  }


}
