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
  columnasMostradas: string[] = ['id', 'title', 'summary'];
  dataSource = new MatTableDataSource<News>();

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // Usamos un setter para asegurarnos de que en cuanto el paginador aparezca en el HTML,
  // se asocie de inmediato al dataSource de forma segura.
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    if (mp) {
      this.dataSource.paginator = mp;
    }
  }

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.cargarNoticias();
  }

  // 2. CORREGIDO: Eliminamos la línea conflictiva de adentro
  cargarNoticias(): void {
    this.newsService.getNews().subscribe(datos => {
      // next: (datos: any) => { // Puedes usar 'any' o tipar la respuesta de tu backend

      // CAMBIO AQUÍ: Asigna 'datos.data' en lugar de 'datos'
      this.dataSource.data = datos;
      console.log("Lista limpia en el componente: ", datos);
    console.log("ng on init: ", datos);

      // console.log("noticias traidas: ", datos.data); // Ahora verás el array de 6 elementos directamente
    });
    // error: (error) => {
    //   console.error('Error al consumir la API:', error);
    // }
  }
}
