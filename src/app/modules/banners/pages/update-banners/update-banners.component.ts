import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Banner, BannerDto } from '../../interfaces/data';
import { BannersService } from '../../services/banners.service';
import { FileService } from '../../../../shared/services/file.service';

@Component({
  selector: 'app-update-banners',
  standalone: false,
  templateUrl: './update-banners.component.html',
  styleUrl: './update-banners.component.css'
})
export class UpdateBannersComponent {

  @Input() display: boolean = false;
  @Input() bannerData: Banner | null = null; // Recibe el banner seleccionado para editar
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() onUpdated = new EventEmitter<void>(); // Emite señal para recargar la tabla

  isSaving: boolean = false;

  constructor(
    private bannerService: BannersService,
    private _serviceFile: FileService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bannerData'] && this.bannerData) {
      // Lógica adicional si se requiere cuando cambia el banner seleccionado
    }
  }

  actualizarBanner(event: { data: BannerDto, file: File | null }): void {
    if (!this.bannerData) return;

    this.isSaving = true;
    const requestData: BannerDto = event.data;
    const fileToUpload: File | null = event.file;

    // Si el usuario seleccionó una nueva imagen, la subimos primero a /api/files
    if (fileToUpload) {
      this._serviceFile.subirArchivo(fileToUpload).subscribe({
        next: (fileId: number) => {
          requestData.file_id = fileId;
          this.ejecutarActualizacion(this.bannerData!.banner_id, requestData);
        },
        error: (err) => {
          this.isSaving = false;
          console.error('Error al subir la nueva imagen:', err);
        }
      });
    } else {
      // Si no seleccionó nueva imagen, conservamos el file_id actual que ya tenía
      requestData.file_id = this.bannerData.file_id;
      this.ejecutarActualizacion(this.bannerData.banner_id, requestData);
    }
  }

  private ejecutarActualizacion(id: number, requestData: BannerDto): void {
    this.bannerService.updateBanner(id, requestData).subscribe({
      next: () => {
        this.isSaving = false;
        this.onUpdated.emit(); // Notificamos al listado para recargar los datos
        this.closeDialog();    // Cerramos el modal
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Error al actualizar banner:', err);
      }
    });
  }

  closeDialog(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
