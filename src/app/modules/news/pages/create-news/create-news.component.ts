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
    console.log('IMAGEN SELECCIONADA: ',file)
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

registrarNoticia(event: { data: dtoNews, file: File | null } | any): void {
  this.btnGuardarEnabled = false;

  // Extraemos la información del evento emitido
  const requestData: dtoNews = event.data ? event.data : event;
  const fileToUpload: File | null = event.file ? event.file : null;

  console.log('Objeto data recibido:', requestData);
  console.log('Archivo recibido:', fileToUpload);

  // Si hay imagen, la subimos primero a /api/files
  if (fileToUpload) {
    this._serviceFile.subirArchivo(fileToUpload).subscribe({
      next: (fileId: number) => {
        console.log('Imagen subida con éxito. file_id generado:', fileId);
        
        // Asignamos el ID retornado a la noticia
        requestData.file_id = fileId;
        
        // Guardamos la noticia en la base de datos
        this.guardarNoticiaHttp(requestData);
      },
      error: (err) => {
        this.btnGuardarEnabled = true;
        console.error('Error al subir la imagen:', err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      }
    });
  } else {
    // Si no seleccionó imagen, guardamos directo
    this.guardarNoticiaHttp(requestData);
  }
}

private guardarNoticiaHttp(request: dtoNews): void {
  this._serviceNews.createNews(request).subscribe({
    next: (noticiaCreada) => {
      Swal.fire({
        icon: 'success',
        title: '¡Creado!',
        text: 'La noticia se ha guardado correctamente.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      this.dialogRef.close(true);
    },
    error: (err) => {
      this.btnGuardarEnabled = true;
      const mensajeError = err.error?.message || 'Ocurrió un error inesperado';
      Swal.fire('Error', mensajeError, 'error');
    }
  });
}

}
