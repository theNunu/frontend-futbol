import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { TournamentService } from '../services/tournament.service';
// import { IData, RequestDto, Tournament } from '../interfaces/data';
import Swal from 'sweetalert2';
import { SeasonService } from '../services/season.service';
import { RequestDto} from '../interfaces/data';

@Component({
  selector: 'app-create-or-edit',
  standalone: false,
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.css'
})
export class CreateOrEditComponent {

  private seasonService = inject(SeasonService);
  private fb = inject(FormBuilder);

  // Definimos el evento de salida
  @Output() seasonCreated = new EventEmitter<void>();

  //guardar un torneo
  loading = false;

  selectedSeasonId: number | null = null; // null = Crear, número = Editar

  // Usa el FormBuilder con la opción nonNullable
  seasonForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    active: [true]
    // active: ['', [Validators.required]]
  });

  saveSeason() {
    
    if (this.seasonForm.invalid) return;
    console.log("temporada: ", this.seasonForm);

    this.loading = true; //Evitar el "Double Click":
    const request: RequestDto = this.seasonForm.getRawValue();

    const operation = this.seasonService.postSeason(request);

    operation.subscribe({
      next: (res) => {
        console.log('Éxito:', res);
        Swal.fire('¡Éxito!', 'Post creado correctamente', 'success');
        // Swal.fire('¡Éxito!', this.selectedTournamentId ? 'Actualizado' : 'Creado', 'success');
        // this.tournamentForm.reset();//limpiampos  el formulario con reset
        this.loading = false;

        // ESTO ES LO NUEVO: Avisamos al padre
        this.seasonCreated.emit();
      },
      error: () => (this.loading = false)

    });
  }

  showModalCreate = false;
  openModalCreate() {
    // this.showModalCreate = true;
 //selectedSeasonId: number | null = null; // null = Crear, número = Editar
    //
    this.selectedSeasonId = null;
    this.seasonForm.reset();
    this.showModalCreate = true;

  }

  // Esta función la llamarás desde el Index cuando el usuario pulse "Editar"
  // openModalEdit(season: Season) {
  //   this.selectedTournamentId = season.season_id;
  //   this.showModalCreate = true;

  //   // Rellenamos el formulario con los datos existentes
  //   this.tournamentForm.patchValue({
  //     name: season.name,
  //     active: season.active
  //   });
  // }

  closeModalCreate() {
    this.showModalCreate = false;
  }


}
