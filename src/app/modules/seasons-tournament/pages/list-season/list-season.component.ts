import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SeasonService } from '../../services/season.service';
import { SeasonDto, SeasonI } from '../../interfaces/data';
@Component({
  selector: 'app-list-season',
  standalone: false,
  templateUrl: './list-season.component.html',
  styleUrl: './list-season.component.css'
})
export class ListSeasonComponent implements OnInit {


  // idNews: number;
  seasons: SeasonI[] = [];
  selectedNoticia: SeasonI | null = null;

  // seasonDto: SeasonDto | null = null;
  showCreateModal: boolean = false;
  showUpdateModal: boolean = false;
  isLoading: boolean = false;

  // 2. Inyectamos MatDialog en el constructor
  constructor(
    private seasonService: SeasonService,
    private messageService: MessageService,

  ) {
    // this.idNews = data;
  }

  ngOnInit(): void {// Prueba 1
    this.cargarNoticias();
    console.log('season cargadas');
  }

  //  cargarNoticias(): void {
  //   this.seasonService.getSeasons().subscribe(datos => {
  //     this.seasons = datos;
  //   });
  // }

  cargarNoticias(): void {
    // this.seasonService.getSeasons().subscribe(datos => {
    //   this.seasons = datos;
    // });
    this.isLoading = true;
    this.seasonService.getSeasons().subscribe({
      next: (data) => {
        this.seasons = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar noticias' });
      }
    });
  }

  openCreate(): void {
    this.showCreateModal = true;
  }

  openUpdate(noticia: SeasonI): void {
    this.selectedNoticia = { ...noticia };
    this.showUpdateModal = true;
  }

}
