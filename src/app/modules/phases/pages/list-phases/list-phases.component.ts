import { Component, OnInit } from '@angular/core';
import { Phase, Tournament } from '../../interfaces/data';
import { HttpErrorResponse } from '@angular/common/http';
import { PhasesService } from '../../services/phases.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-list-phases',
  standalone: false,
  templateUrl: './list-phases.component.html',
  styleUrl: './list-phases.component.css'
})
export class ListPhasesComponent implements OnInit {

  filterForm!: FormGroup;

  showPhases: boolean = false;
  

  // phaseForm!: FormGroup;
  // Listado tipado de torneos (Cero any)
  phasesList: Phase[] = [];

  // Torneo seleccionado al hacer clic en el botón de ojo
  selectedTournament: Tournament | null = null;

  // activa fase
  showPhasesModal: boolean = false;
  showUpdateModal: boolean = false;
  selectedPhaseToUpdate: Phase | null = null; // Fase elegida para editar

  constructor(
    // private fb: FormBuilder,
    private phasesService: PhasesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // this.initForm();
    this.initFilterForm();
    this.loadTournaments();
  }

  private initFilterForm(): void {
    this.filterForm = this.fb.group({
      tournamentId: [null],
      name: ['']
    });
  }

  // Cargar el listado inicial de torneos al iniciar el componente
  loadTournaments(): void {
    const formValues = this.filterForm.value;
    this.phasesService.getPhases(formValues).subscribe({
      next: (response) => {
        console.log("listado fases",response);
        if (response.success) {
          this.phasesList = response.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar fases:', error);
      }
    });
  }
  // Acción ejecutada al hacer clic en el botón de "ojo" 👁️
  onViewPhases(tournamentId: number): void {
    this.phasesService.getPhasesByTournamentId(tournamentId).subscribe({
      next: (response) => {
        if (response.success) {
          this.selectedTournament = response.data;
          // this.phaseForm.patchValue({ tournament_id: tournamentId });
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener el detalle del torneo:', error.message);
      }
    });
  }

  // Abre el modal de actualización pasando el objeto de la fila elegida
  // seePhases(tournament: Tournament): void {
  //   this.selectedTournament = { ...tournament };
  //   this.showPhases = true;
  // }
  // Abre el modal de PrimeNG pasando el objeto y opcionalmente consultando el detalle actualizado
  seePhases(tournament: Tournament): void {
    this.selectedTournament = { ...tournament };
    this.showPhases = true;

    // Opcional: Si el listado general no trae las fases completas y necesitas pedirlas por ID:
    if (tournament.tournament_id) {
      this.phasesService.getPhasesByTournamentId(tournament.tournament_id).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            // Asignamos el torneo detallado que incluye el array de fases (hijos)
            this.selectedTournament = response.data;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al obtener el detalle de las fases:', error.message);
        }
      });
    }
  }

  // Abre el modal secundario de actualización (Botón Lápiz)
  openUpdatePhase(phase: Phase): void {
    this.selectedPhaseToUpdate = { ...phase };
    this.showUpdateModal = true;
  }

  // Se ejecuta cuando la fase se guarda exitosamente desde el componente update-phase
  handlePhaseUpdated(): void {
    this.showUpdateModal = false;
    // Refrescamos los datos del torneo actual para ver los cambios reflejados
    if (this.selectedTournament) {
      this.seePhases(this.selectedTournament);
    }
    this.loadTournaments();
  }


}
