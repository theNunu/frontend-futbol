// import { Component } from '@angular/core';

import { Component, inject } from '@angular/core';
import { SeasonService } from './services/season.service';
import { mySeason, Season, Seasons } from './interfaces/data';

@Component({
  selector: 'app-seasons',
  standalone: false,
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css'
})
export class SeasonsComponent {
    // constructor(private router: Router) {} // 2. Inyectar Router

  private seasonService = inject(SeasonService);
  
  list: mySeason[] = []
  ngOnInit(): void {

    this.getAllSeasons();
  }

  getAllSeasons() {
    this.seasonService.getSeasons().subscribe(res => {
      this.list = res; // Esto refresca la vista automáticamente
    });
  }

  //para el modeal
  // PARA EL MODAL
  public selectedSeason: Seasons | null = null;
  showModal = false;

  openProduct(id: number){

    // this.seasonService.getSeasonById(id).subscribe ({
    //   next: (data: Season) =>{
    //     console.log('el id:', data, 'el nombre',data.name)

    //     this.selectedSeason = data;
    //   },

    // })
    this.seasonService.getSeasonById(id).subscribe({
  next: (response) => {
    // 1. Accedemos a response.data para obtener el objeto de la temporada
    const seasons = response.data;

    // 2. Imprimimos solo el nombre
    console.log('El nombre de la temporada es:', seasons.name);

    // 3. Asignamos a nuestra variable global para el HTML
    this.selectedSeason = seasons;

    // ¡ESTA ES LA LÍNEA QUE FALTA!
      this.showModal = true;
  },
  error: (err) => console.error(err)
});

  }

  closeModal() {
    this.showModal = false;
  }

  /*
  fetchUser(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (data: User) => {
        this.user = data; // 'data' ya es de tipo User, no hay any involucrado
      },
      error: (err) => console.error('Error al obtener usuario', err)
    });
  }
  
  */


}
