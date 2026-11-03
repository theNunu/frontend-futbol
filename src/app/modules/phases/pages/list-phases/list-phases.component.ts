import { Component, OnInit } from '@angular/core';
import { TournamentsService } from '../../../tournament/services/tournaments.service';
import { Tournament } from '../../interfaces/data';
import { HttpErrorResponse } from '@angular/common/http';
import { PhasesService } from '../../services/phases.service';

@Component({
  selector: 'app-list-phases',
  standalone: false,
  templateUrl: './list-phases.component.html',
  styleUrl: './list-phases.component.css'
})
export class ListPhasesComponent implements OnInit {

  // phaseForm!: FormGroup;
  // Listado tipado de torneos (Cero any)
  tournamentsList: Tournament[] = [];

  // Torneo seleccionado al hacer clic en el botón de ojo
  selectedTournament: Tournament | null = null;

  constructor(
    // private fb: FormBuilder,
    private phasesService: PhasesService
  ) { }

  ngOnInit(): void {
    // this.initForm();
    this.loadTournaments();
  }

  // Cargar el listado inicial de torneos al iniciar el componente
  loadTournaments(): void {
    this.phasesService.getTournaments().subscribe({
      next: (response) => {
        if (response.success) {
          this.tournamentsList = response.data.tournaments;
        }
      },
      error: (error) => {
        console.error('Error al cargar torneos:', error);
      }
    });
  }
  // Acción ejecutada al hacer clic en el botón de "ojo" 👁️
  onViewPhases(tournamentId: number): void {
    this.phasesService.getTournamentById(tournamentId).subscribe({
      next: (response) => {
        if (response.success) {
          this.selectedTournament = response.data.tournament;
          // this.phaseForm.patchValue({ tournament_id: tournamentId });
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener el detalle del torneo:', error.message);
      }
    });
  }

}
