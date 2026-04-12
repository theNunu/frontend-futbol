import { Component, inject } from '@angular/core';

// import { IData, RequestDto } from './interfaces/data';
import { FormBuilder, Validators } from '@angular/forms';
import { TournamentService } from '../services/tournament.service';
import { RequestDto } from '../interfaces/data';
@Component({
  selector: 'app-create-or-edit',
  standalone: false,
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.css'
})
export class CreateOrEditComponent {
    private tournamentService = inject(TournamentService);
    private fb = inject(FormBuilder);

  //guardar un torneo
  loading = false;

  // // Inicialización directa de la propiedad
  // tournamentForm = this.fb.group({
  //   name: ['', [Validators.required, Validators.minLength(3)]],
  //   season: ['', [Validators.required]]
  // });

  // Usa el FormBuilder con la opción nonNullable
  tournamentForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    season: ['', [Validators.required]]
  });

  saveTournament() {
    if (this.tournamentForm.invalid) return;

    this.loading = true;
    const request: RequestDto = this.tournamentForm.getRawValue();

    this.tournamentService.postTournament(request).subscribe({
      next: (res) => {

        // 1. Limpias la lista actual (opcional, pero ayuda a evitar duplicados visuales)
        // this.list = [];

        // // 2. Llamas a tu función que trae todos los registros
        // this.tournamentService.getTournaments().subscribe(res => {
        //   this.list = res
        // })

        console.log('Éxito:', res);
        this.tournamentForm.reset();
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  showModalCreate = false;
  openModalCreate() {
    this.showModalCreate = true;

  }

  closeModalCreate() {
    this.showModalCreate = false;
  }


}
