import { Component, inject } from '@angular/core';
import { TournamentService } from './services/tournament.service';
import { IData, RequestDto } from './interfaces/data';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-tournaments',
  standalone: false,
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css'
})
export class TournamentsComponent {
  private tournamentService = inject(TournamentService);
  private fb = inject(FormBuilder);

  list: IData[] = []
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.tournamentService.getTournaments().subscribe(res => {
      this.list = res
    })
  }

  //para el modeal
  // PARA EL MODAL
  selectedProduct: any = null;
  showModal = false;

  openProduct(id: number) {

    this.tournamentService.getTournamentById(id).subscribe((res: any) => {
      // console.log('el id: ', id, res)

      this.selectedProduct = res.data;
      this.showModal = true;
    });

  }

  closeModal() {
    this.showModal = false;
  }

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
        this.list = [];

        // 2. Llamas a tu función que trae todos los registros
        this.tournamentService.getTournaments().subscribe(res => {
          this.list = res
        })

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
