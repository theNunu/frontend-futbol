import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TournamentsService } from '../../services/tournaments.service';
import { TournamentDto, TournamentDtoUpdate } from '../../interfaces/data';

@Component({
  selector: 'app-update-tournamets',
  standalone: false,
  templateUrl: './update-tournamets.component.html',
  styleUrl: './update-tournamets.component.css'
})
export class UpdateTournametsComponent {
  @Input() display: boolean = false;
  @Input() tournament: TournamentDtoUpdate | null = null;

  @Output() displayChange = new EventEmitter<boolean>();
  @Output() onUpdated = new EventEmitter<void>();

  isSaving: boolean = false;

  constructor(private tournamentService: TournamentsService) { }

  actualizarTournament(event: { data: TournamentDtoUpdate }): void {
    // Si no tenemos el ID del torneo, cancelamos
    const id = this.tournament?.tournament_id;
    if (!id) return;

    this.isSaving = true;
    const requestData: TournamentDtoUpdate = event.data;

    this.tournamentService.updateTournament(id, requestData).subscribe({
      next: () => {
        this.isSaving = false;
        this.onUpdated.emit(); // Notificamos al listado para recargar la tabla
        this.closeDialog();    // Cerramos el modal
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Error al actualizar el torneo:', err);
      }
    });
  }

  closeDialog(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
