// import { Component } from '@angular/core';

import { Component, inject } from '@angular/core';
// import { TournamentService } from './services/tournament.service';
// import { IData, RequestDto, Tournament } from './interfaces/data';
import { FormBuilder, Validators } from '@angular/forms';
import { SeasonService } from './services/season.service';
import { Season } from './interfaces/data';

@Component({
  selector: 'app-seasons',
  standalone: false,
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css'
})
export class SeasonsComponent {
    // constructor(private router: Router) {} // 2. Inyectar Router

  private seasonService = inject(SeasonService);
  
  list: Season[] = []
  ngOnInit(): void {

    this.getAllSeasons();
  }

  getAllSeasons() {
    this.seasonService.getSeasons().subscribe(res => {
      this.list = res; // Esto refresca la vista automáticamente
      console.log('listado de temporadas: ', this.list)
    });
  }

  //para el modeal
  // PARA EL MODAL
  selectedProduct: Season | null = null;
  showModal = false;

  openProduct(id: number) {

    this.seasonService.getSeasonById(id).subscribe((res: any) => {
      // console.log('el id: ', id, res)

      this.selectedProduct = res.data;
      this.showModal = true;
    });

  }

  closeModal() {
    this.showModal = false;
  }


}
