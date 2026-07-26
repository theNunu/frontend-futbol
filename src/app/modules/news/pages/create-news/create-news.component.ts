import { Component, Inject, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { dtoNews } from '../../interfaces/data';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FileService } from '../../../../shared/services/file.service';
@Component({
  selector: 'app-create-news',
  standalone: false,
  templateUrl: './create-news.component.html',
  styleUrl: './create-news.component.css'
})
export class CreateNewsComponent implements OnInit {


  btnGuardarEnabled: boolean = true;

  isUploading: boolean = false; //
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  constructor(
    private _serviceNews: NewsService,
    private _serviceFile: FileService,
    public dialogRef: MatDialogRef<CreateNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  // 1. Detecta cuando el usuario selecciona una imagen en el <input type="file">
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Vista previa de la imagen local en el formulario
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  ngOnInit(): void { }
  registrarNoticia(request: dtoNews): void {
    console.log('Recibiendo noticia en CreateNewsComponent:', request);
    this.btnGuardarEnabled = false;


    if (this.selectedFile) {
      const fileId = this._serviceFile.subirArchivo(this.selectedFile);
      this.data.patchValue({ file_id: fileId });
    }



    // SI EL USUARIO SELECCIONÓ UN ARCHIVO: Lo subimos primero a /api/files
    // if (this.selectedFile) {
    //   const fileId = await this.subirArchivo(this.selectedFile);
    //   this.dtoNews.patchValue({ file_id: fileId });
    // }
    this._serviceNews.createNews(request).subscribe({
      // this.cargarNoticias();

      next: (noticiaCreada) => {
        console.log('Noticia guardada con éxito:', noticiaCreada);
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
        this.dialogRef.close(true);
        // this.cargarNoticias(); // Refresca la tabla automáticamente
      },

      error: (err) => {
        this.btnGuardarEnabled = true;
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
