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
  ;
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() onCreated = new EventEmitter<void>();

  isSaving: boolean = false;

  constructor(
    private bannerService: BannersService,
    private _serviceFile: FileService,
  ) { }


  ngOnInit(): void { }

  registrarBanner(event: { data: BannerDto, file: File | null }): void {
    this.isSaving = true;

    const requestData: BannerDto = event.data;
    const fileToUpload: File | null = event.file;

    // Si hay imagen, la subimos primero a /api/files
    if (fileToUpload) {
      this._serviceFile.subirArchivo(fileToUpload).subscribe({
        next: (fileId: number) => {

          // Asignamos el ID retornado a la noticia
          requestData.file_id = fileId;

          // Guardamos la noticia en la base de datos
          this.guardarBannerHttp(requestData);
        },
        error: (err) => {
          // this.btnGuardarEnabled = true;
          console.error('Error al subir la imagen:', err);
          // Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        }
      });
    } else {
      // Si no seleccionó imagen, guardamos directo
      this.guardarBannerHttp(requestData);
    }
  }

  private guardarBannerHttp(request: BannerDto): void {
    this.bannerService.createBanner(request).subscribe({
      next: () => {
        this.isSaving = false;
        this.onCreated.emit(); // Notificamos al listado para recargar
        this.closeDialog();    // Cerramos el modal
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Error al crear banner:', err);
      }
    });
  }

  closeDialog(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
