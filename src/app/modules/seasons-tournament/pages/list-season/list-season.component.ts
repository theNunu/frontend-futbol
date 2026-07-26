import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SeasonService } from '../../services/season.service';
import { SeasonI } from '../../interfaces/data';
@Component({
  selector: 'app-list-season',
  standalone: false,
  templateUrl: './list-season.component.html',
  styleUrl: './list-season.component.css'
})
export class ListSeasonComponent implements OnInit {


  // idNews: number;

  // 2. Inyectamos MatDialog en el constructor
  constructor(
    private seasonService: SeasonService,
    private dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: number

  ) {
    // this.idNews = data;
  }
  // columnasMostradas: string[] = ['id', 'season', 'name', 'state', 'actions'];
  // dataSource = new MatTableDataSource<SeasonI>();

  seasons: SeasonI[] = [];

  ngOnInit(): void {// Prueba 1
    this.cargarNoticias();
  }

  // cargarNoticias(): void {
  //   this.seasonService.getSeasons().subscribe(datos => {
  //     this.seasons = datos;
  //   });
  // }

  cargarNoticias(): void {
    this.seasonService.getSeasons().subscribe(datos => {
      this.seasons = datos;
    });
  }

  //   cargarTemporadas(): void {
  //   this.seasonService.getSeasons().subscribe({
  //     next: (into) => {
  //       this.seasons.data = into; // Guardamos los datos del backend
  //     },
  //     error: (err) => {
  //       console.error('Error al traer las temporadas:', err);
  //     }
  //   });
  // }

}
