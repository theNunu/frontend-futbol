import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournaments',
  standalone: false,
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css'
})
export class TournamentsComponent implements OnInit {

  tournaments: any[] = [];

  constructor() { }


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
