import { Component, OnInit, ViewChild, Inject } from '@angular/core';
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
import { UpdateNewsComponent } from '../update-news/update-news.component';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-list-news',
  standalone: false,
  templateUrl: './list-news.component.html',
  styleUrl: './list-news.component.css'
})
export class ListNewsComponent implements OnInit {

  // idNews: number;

  // 2. Inyectamos MatDialog en el constructor
  constructor(
    private newsService: NewsService,
    private dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: number

  ) {
    // this.idNews = data;
  }
  columnasMostradas: string[] = ['id', 'title', 'summary', 'description', 'image', 'actions'];
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

  ngOnInit(): void {
    console.log('El componente ListNews se ha inicializado'); // Prueba 1
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

  // 3. Tu función para abrir el editar de forma nativa
  editarNoticia(idNews: number): void {
    const dialogRef = this.dialog.open(UpdateNewsComponent, {
      width: '30vw',
      height: '90vh',
      disableClose: true, // Esto evita que se cierre al hacer clic afuera (equivale al 'true' de tu shared)
      data: idNews        // <-- Así es como pasas el ID nativamente a MAT_DIALOG_DATA
    });

    // 4. Escuchamos el cierre para refrescar la lista
    dialogRef.afterClosed().subscribe(() => {
      // Cuando en el update hagas: this.dialogRef.close(), entrará aquí
      this.cargarNoticias();
    });
  }

  /**
 * Genera la URL completa para el tag <img>
 */
  getImagenUrl(noticia: News): string {
    // Caso 1: Si el backend devuelve la relación cargada (objeto 'file')
    // if (noticia.file && noticia.file.path) {
    //   return `${this.newsService.storageUrl}${noticia.file.path}`;
    // }
    // Verificamos si existe el objeto 'files' y si tiene la propiedad 'path'
    if (noticia.files && noticia.files.path) {
      // Limpiamos cualquier '/' sobrante al inicio
      const cleanPath = noticia.files.path.replace(/^\//, '');
      return `${this.newsService.storageUrl}${cleanPath}`;
    }

    // Caso 2: Si por alguna razón la URL viniera directa
    // if (noticia.image) {
    //   return noticia.image;
    // }

    // Caso 3: Placeholder por defecto si file_id es null o no hay imagen
    return 'assets/no-image.jpg'; // O una URL remota de placeholder
  }

}
