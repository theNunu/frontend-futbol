import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TournamentsService } from '../../services/tournaments.service';
import { TournamentDto } from '../../interfaces/data';
// import { TournamentService } from '../../../../services/tournament.service';

@Component({
  selector: 'app-create-tournamets',
  standalone: false,
  templateUrl: './create-tournamets.component.html',
  styleUrl: './create-tournamets.component.css'
})
export class CreateTournametsComponent {

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() onCreated = new EventEmitter<void>();

  isSaving: boolean = false;

  constructor(
    private tournamentService: TournamentsService,
    // private _serviceFile: FileService,
  ) { }


  ngOnInit(): void { }

  registrarTournament(event: { data: TournamentDto }): void {
    this.isSaving = true;

    const requestData: TournamentDto = event.data;

    this.guardarTournament(requestData);

  }

  private guardarTournament(request: TournamentDto): void {
    this.tournamentService.createTournament(request).subscribe({
      next: () => {
        this.isSaving = false;
        this.onCreated.emit(); // Notificamos al listado para recargar
        this.closeDialog();    // Cerramos el modal
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Error al crear el torneo:', err);
      }
    });
  }

  closeDialog(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }


}
