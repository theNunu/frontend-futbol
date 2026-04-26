// import { Component, inject } from '@angular/core';
import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TournamentService } from '../services/tournament.service';
import { IData, RequestDto, Tournament } from '../interfaces/data';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-or-edit',
  standalone: false,
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.css'
})
export class CreateOrEditComponent {
  private tournamentService = inject(TournamentService);
  private fb = inject(FormBuilder);

  // Definimos el evento de salida
  @Output() tournamentCreated = new EventEmitter<void>();

  //guardar un torneo
  loading = false;

  selectedTournamentId: number | null = null; // null = Crear, número = Editar

  // Usa el FormBuilder con la opción nonNullable
  tournamentForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    season: ['', [Validators.required]]
  });

  saveTournament() {
    if (this.tournamentForm.invalid) return;

    this.loading = true;
    const request: RequestDto = this.tournamentForm.getRawValue();

    // LÓGICA DE DECISIÓN: ¿Es crear o editar?
    const operation = this.selectedTournamentId
      ? this.tournamentService.updateTournament(this.selectedTournamentId, request)
      : this.tournamentService.postTournament(request);

    operation.subscribe({
      next: (res) => {
        //  this.getAllTournaments()

        console.log('Éxito:', res);
        // Swal.fire('¡Éxito!', 'Post creado correctamente', 'success');
        Swal.fire('¡Éxito!', this.selectedTournamentId ? 'Actualizado' : 'Creado', 'success');
        // this.tournamentForm.reset();//limpiampos  el formulario con reset
        this.loading = false;

        // ESTO ES LO NUEVO: Avisamos al padre
        this.tournamentCreated.emit();
      },
      error: () => (this.loading = false)

    });
  }

  showModalCreate = false;
  openModalCreate() {
    // this.showModalCreate = true;
    this.selectedTournamentId = null;
    this.tournamentForm.reset();
    this.showModalCreate = true;

  }

  // Esta función la llamarás desde el Index cuando el usuario pulse "Editar"
  openModalEdit(tournament: Tournament) {
    this.selectedTournamentId = tournament.tournament_id;
    this.showModalCreate = true;

    // Rellenamos el formulario con los datos existentes
    this.tournamentForm.patchValue({
      name: tournament.name,
      season: tournament.season
    });
  }

  closeModalCreate() {
    this.showModalCreate = false;
  }


}
