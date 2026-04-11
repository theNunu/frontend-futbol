import { Component, inject } from '@angular/core';
import { TournamentService } from './services/tournament.service';
import { IData } from './interfaces/data';

@Component({
  selector: 'app-tournaments',
  standalone: false,
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css'
})
export class TournamentsComponent {
  private tournamentService = inject(TournamentService);
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
}
