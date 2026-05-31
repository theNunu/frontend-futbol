import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog'; // 1. Importa MatDialog
import { News } from '../interfaces/data';
import { NewsService } from './services/news.service';
import { FormNewsComponent } from './components/form-news/form-news.component'; // Tu formulario

@Component({
  selector: 'app-news',
  standalone: false,
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  columnasMostradas: string[] = ['id', 'title', 'summary'];
  dataSource = new MatTableDataSource<News>();

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    if (mp) {
      this.dataSource.paginator = mp;
    }
  }

  // 2. Inyectamos MatDialog en el constructor
  constructor(
    private newsService: NewsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.newsService.getNews().subscribe(datos => {
      this.dataSource.data = datos;
    });
  }

  // 3. Función para abrir el modal para CREAR
  abrirModalCrear(): void {
    const dialogRef = this.dialog.open(FormNewsComponent, {
      width: '500px',
      data: null // Enviamos null porque es una creación
    });

    dialogRef.afterClosed().subscribe(resultadoPayload => {
      // Si el usuario guardó, el payload vendrá con los datos listos
      if (resultadoPayload) {
        this.newsService.createNews(resultadoPayload).subscribe({
          next: (noticiaCreada) => {
            console.log('Creado con éxito:', noticiaCreada);
            this.cargarNoticias(); // <-- MAGIA: Actualiza la tabla automáticamente
          },
          error: (err) => console.error('Error al crear:', err)
        });
      }
    });
  }

  // Extra profesional: Así reutilizas el mismo modal para EDITAR
  abrirModalEditar(noticia: News): void {
    const dialogRef = this.dialog.open(FormNewsComponent, {
      width: '500px',
      data: noticia // Le pasamos la noticia seleccionada
    });

    dialogRef.afterClosed().subscribe(resultadoPayload => {
      if (resultadoPayload) {
        // Aquí llamarías a tu método this.newsService.updateNews(noticia.news_id, resultadoPayload)
        // Y al terminar haces un: this.cargarNoticias();
      }
    });
  }
}