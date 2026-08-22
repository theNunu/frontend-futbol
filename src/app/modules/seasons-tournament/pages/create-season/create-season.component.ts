import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SeasonService } from '../../services/season.service';
import { SeasonDto } from '../../interfaces/data';

@Component({
  selector: 'app-create-season',
  standalone: false,
  templateUrl: './create-season.component.html',
  styleUrl: './create-season.component.css'
})
export class CreateSeasonComponent {

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() onCreated = new EventEmitter<void>();

  isSaving: boolean = false;

  constructor(
    private seasonService: SeasonService,
    private messageService: MessageService
  ) { }

  saveNoticia(seasonData: SeasonDto): void {
    this.isSaving = true;
    this.seasonService.postSeason(seasonData).subscribe({
      next: () => {
        this.isSaving = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Noticia creada correctamente'
        });
        this.closeDialog();
        this.onCreated.emit();
      },
      error: () => {
        this.isSaving = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear la noticia'
        });
      }
    });
  }

  closeDialog(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
