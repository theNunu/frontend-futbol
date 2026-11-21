import { Component, OnDestroy, OnInit } from '@angular/core';
import { Phase, Tournament, TournamentsList } from '../../interfaces/data';
import { HttpErrorResponse } from '@angular/common/http';
import { PhasesService } from '../../services/phases.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-list-phases',
  standalone: false,
  templateUrl: './list-phases.component.html',
  styleUrl: './list-phases.component.css'
})
export class ListPhasesComponent implements OnInit, OnDestroy {

  filterForm!: FormGroup;

  showPhases: boolean = false;

  // Subject para limpiar las suscripciones y evitar fugas de memoria (Memory Leaks)
  private destroy$ = new Subject<void>();

  // phaseForm!: FormGroup;
  // Listado tipado de torneos (Cero any)
  phasesList: Phase[] = [];

   TournamentList: TournamentsList[] = [];

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
     this.loadPhases();

    // ESCUCHAMOS LOS CAMBIOS DEL FORMULARIO AUTOMÁTICAMENTE
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500), // ⏳ Espera medio segundo (500ms) a que el usuario deje de escribir
        distinctUntilChanged(), // Evita consultas si el valor no cambió realmente
        takeUntil(this.destroy$)
      )
      .subscribe(values => {
        // Se ejecuta automáticamente al escribir o cambiar el select sin botonal
        this.loadPhases();
      });
  }

  private initFilterForm(): void {
    this.filterForm = this.fb.group({
      tournamentId: [null],
      name: ['']
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  // Agrega este método para traer los torneos del backend
loadTournaments(): void {
  this.phasesService.getTournaments().subscribe({
    next: (response) => {
      if (response.success) {
        // Asegúrate de que response.data apunte al arreglo de torneos de tu API
        this.TournamentList = response.data; 
      }
    },
    error: (error) => {
      console.error('Error al cargar la lista de torneos:', error);
    }
  });
}

  // Abre el modal secundario de actualización (Botón Lápiz)
  openUpdatePhase(phase: Phase): void {
    this.selectedPhaseToUpdate = { ...phase };
    this.showUpdateModal = true;
  }

  // Petición al backend con los valores actuales del formulario
  loadPhases(): void {
    // const { tournamentId, name } = this.filterForm.value;
    // this.filterForm.value ya es un objeto tipo { tournament_id: ..., name: ... }
  const formValues = this.filterForm.value;

    this.phasesService.getPhases(formValues).subscribe({
      next: (response) => {
        if (response.success) {
          this.phasesList = response.data;
        }
      },
      error: (error) => {
        console.error('Error al filtrar fases:', error);
      }
    })
  }


  }
