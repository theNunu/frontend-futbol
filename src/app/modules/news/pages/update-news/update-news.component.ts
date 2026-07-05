import { Component, Inject, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
// import { updateoNews } from '../../interfaces/data';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { updateNews, News, NewsI } from '../../interfaces/data';
@Component({
  selector: 'app-update-news',
  standalone: false,
  templateUrl: './update-news.component.html',
  styleUrl: './update-news.component.css'
})
export class UpdateNewsComponent implements OnInit {
  // newsM: News;
  idNews: number;
  // noticia: NewsI;
  dataNews!: News ;
  constructor(
    private _serviceNews: NewsService,
    public dialogRef: MatDialogRef<UpdateNewsComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any 
    @Inject(MAT_DIALOG_DATA) public data: number //// Recibe el ID de la noticia
  ) {
    this.idNews = data;
  }

  ngOnInit(): void {
    this.getNoticia();
  }

  getNoticia() {
    this._serviceNews
      .getNewsById(this.idNews)
      .subscribe({
        next: (res) => {
          this.dataNews = res.data;
        },
        error: (err) => {
          const mensajeError = err.error?.message || 'Ocurrió un error inesperado';

          Swal.fire({
            icon: 'error',
            title: 'Error Notica no econtrada',
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


  updateNoticia(request: updateNews): void {
    // this.btnGuardarEnabled = false;
    this._serviceNews.updateNews(this.idNews, request).subscribe({
      // this.cargarNoticias();
      next: (newsUpdated) => {

        // 2. SWEETALERT DE ÉXITO (Tipo Toast, arriba a la derecha)
        Swal.fire({
          icon: 'success',
          title: 'Actualizado!',
          text: 'La noticia se ha actualizado correctamente.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        this.dialogRef.close(true);
        // this.cargarNoticias(); // Refresca la tabla automáticamente
      },

      error: (err) => {
        // this.btnGuardarEnabled = true;
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


}
