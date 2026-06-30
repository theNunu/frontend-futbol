import { Component, Inject, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { dtoNews } from '../../interfaces/data';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-news',
  standalone: false,
  templateUrl: './create-news.component.html',
  styleUrl: './create-news.component.css'
})
export class CreateNewsComponent {
  
  btnGuardarEnabled: boolean = true;
  constructor(
    // private _sharedService: SharedService,
    private _serviceNews: NewsService,
    // public dialogRef: MatDialogRef<CreateConductorComponent>,
    public dialogRef: MatDialogRef<CreateNewsComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  registrarNoticia(request: dtoNews): void {
    this.btnGuardarEnabled = false;
        this._serviceNews.createNews(request).subscribe({
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
    
                // this.cargarNoticias(); // Refresca la tabla automáticamente
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

}
