// import { Component } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SeasonI, UpdateSeason } from '../../interfaces/data';
import { SeasonService } from '../../services/season.service';
@Component({
  selector: 'app-update-season',
  standalone: false,
  templateUrl: './update-season.component.html',
  styleUrl: './update-season.component.css'
})
export class UpdateSeasonComponent {

  // selectedSeason: SeasonI | null = null;
  @Input() display: boolean = false;
  @Input() season: SeasonI | null = null;

  @Output() displayChange = new EventEmitter<boolean>();
  @Output() onUpdated = new EventEmitter<void>();

  isSaving: boolean = false;

  constructor(
    private noticiaService: SeasonService,
    private messageService: MessageService
  ) { }

  updateSeason(seasonData: UpdateSeason): void {
    if (!this.season?.season_id) return;

    this.isSaving = true;
    this.noticiaService.updateSeason(this.season.season_id, seasonData).subscribe({
      next: () => {
        this.isSaving = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Noticia actualizada correctamente'
        });
        this.closeDialog();
        this.onUpdated.emit();
      },
      error: () => {
        this.isSaving = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar la noticia'
        });
      }
    });
  }

  closeDialog(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
