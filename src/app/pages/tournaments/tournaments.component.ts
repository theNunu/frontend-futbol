import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-tournaments',
  standalone: false,
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css'
})
export class TournamentsComponent implements OnInit {

  tournaments: any[] = [];

  constructor(private tournamentService: TournamentService) { }


  ngOnInit() {

    // this.tournamentService.getTest().subscribe((data: any) => {
    //   this.tournaments = data;
    // });

    // this.tournamentService.getTournaments().subscribe((data: any) => {
    //   this.tournaments = data;
    // });

    // this.productService.getProducts().subscribe((data: any) => {
    //   this.products = data;
    //   this.updatePagination();
    // });

  }
}
