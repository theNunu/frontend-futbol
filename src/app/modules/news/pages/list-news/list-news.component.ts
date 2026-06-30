import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog'; // 1. Importa MatDialog
// import { News } from '../interfaces/data';
// import { NewsService } from './services/news.service';
// import { FormNewsComponent } from './components/form-news/form-news.component'; // Tu formulario

// 1. IMPORTA SWEETALERT2
import Swal from 'sweetalert2';

import { NewsService } from '../../services/news.service';
import { FormNewsComponent } from '../../components/form-news/form-news.component';
import { FiltrosNews, News } from '../../interfaces/data';
import { CreateNewsComponent } from '../create-news/create-news.component';

@Component({
  selector: 'app-list-news',
  standalone: false,
  templateUrl: './list-news.component.html',
  styleUrl: './list-news.component.css'
})
export class ListNewsComponent implements OnInit {
  columnasMostradas: string[] = ['id', 'title', 'summary', 'description', 'actions'];
  dataSource = new MatTableDataSource<News>();

  // 1. Objeto de filtros vinculado al HTML mediante [(ngModel)]
  public filtros: FiltrosNews = {
    title: '',
    is_active: ''
  };

  // Listado de opciones estilizadas para el p-select
  public opcionesEstado = [
    { label: '📰 Todos', value: '' },
    { label: '✅ Activos', value: 'true' },
    { label: '❌ Inactivos', value: 'false' }
  ];


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
    this.newsService.getNews(this.filtros).subscribe(datos => {
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
      if (resultadoPayload) {
        this.newsService.createNews(resultadoPayload).subscribe({
          next: (noticiaCreada) => {

            // 2. SWEETALERT DE ÉXITO (Tipo Toast, arriba a la derecha)
            Swal.fire({
              icon: 'success',
              title: '¡Creado!',
              text: 'La noticia se ha guardado correctamente.',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            });

            this.cargarNoticias(); // Refresca la tabla automáticamente
          },
          error: (err) => {
            console.error('Error capturado completo:', err);

            // Extraemos el mensaje que mandó Laravel
            const mensajeError = err.error?.message || 'Ocurrió un error inesperado';

            // 3. SWEETALERT DE ERROR (Tipo Toast, arriba a la derecha)
            Swal.fire({
              icon: 'error',
              title: 'Error de validación',
              text: mensajeError, // Aquí se pinta: "La fecha de fin debe ser mayor a la fecha de inicio."
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              // Esto hace que si el usuario pasa el mouse por encima, el tiempo se pause para que alcance a leer bien
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              }
            });
          }
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

  abrirCrear(): void {
    const dialogRef = this.dialog.open(CreateNewsComponent, {
      width: '550px',
      disableClose: true // Evita que se cierre al hacer clic afuera
    });

    // Tipamos estrictamente el resultado esperado del modal (un boolean)
    dialogRef.afterClosed().subscribe((subido: boolean | undefined) => {
      if (subido) {
        this.cargarNoticias(); // Si se creó con éxito, refrescamos la tabla
      }
    });
  }
  
}
