import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { News } from '../interfaces/data';
import { NewsService } from './services/news.service';
@Component({
  selector: 'app-news',
  standalone: false,
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  // Columnas que se mostrarán en el HTML
  columnasMostradas: string[] = ['id', 'nombre', 'correo'];
  dataSource = new MatTableDataSource<News>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.newsService.getNews().subscribe({
      next: (datos) => {
        this.dataSource.data = datos; // Asigna los datos a la tabla
        this.dataSource.paginator = this.paginator; // Enlaza el paginador si lo usas
      },
      error: (error) => {
        console.error('Error al consumir la API:', error);
      }
    });
  }
}
