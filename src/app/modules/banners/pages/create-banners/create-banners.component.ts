// import { Component } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BannersService } from '../../services/banners.service';
import { FileService } from '../../../../shared/services/file.service';
import { BannerDto } from '../../interfaces/data';

@Component({
  selector: 'app-create-banners',
  standalone: false,
  templateUrl: './create-banners.component.html',
  styleUrl: './create-banners.component.css'
})
export class CreateBannersComponent {

  //  @Input() display: boolean = false;
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() onCreated = new EventEmitter<void>();
  isSaving: boolean = false;

  btnGuardarEnabled: boolean = true;

  isUploading: boolean = false; //
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  constructor(
    private bannerService: BannersService,
    private _serviceFile: FileService,
    // public dialogRef: MatDialogRef<CreateNewsComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  // 1. Detecta cuando el usuario selecciona una imagen en el <input type="file">
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    console.log('IMAGEN SELECCIONADA: ', file)
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

  registrarBanner(event: { data: BannerDto, file: File | null } | any): void {
    this.btnGuardarEnabled = false;

    // Extraemos la información del evento emitido
    const requestData: BannerDto = event.data ? event.data : event;
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
          // Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        }
      });
    } else {
      // Si no seleccionó imagen, guardamos directo
      this.guardarNoticiaHttp(requestData);
    }
  }

  private guardarNoticiaHttp(request: BannerDto): void {
    this.bannerService.createBanner(request).subscribe({
      next: (noticiaCreada) => {
        // Swal.fire({
        //   icon: 'success',
        //   title: '¡Creado!',
        //   text: 'La noticia se ha guardado correctamente.',
        //   toast: true,
        //   position: 'top-end',
        //   showConfirmButton: false,
        //   timer: 3000
        // });
        // this.dialogRef.close(true);
      },
      error: (err) => {
        this.btnGuardarEnabled = true;
        const mensajeError = err.error?.message || 'Ocurrió un error inesperado';
        // Swal.fire('Error', mensajeError, 'error');
      }
    });
  }

  closeDialog(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
