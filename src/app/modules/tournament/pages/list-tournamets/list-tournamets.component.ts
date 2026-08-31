import { Component, OnInit } from '@angular/core';
import { TournamentsService } from '../../services/tournaments.service';
import { Tournaments } from '../../interfaces/data';

@Component({
  selector: 'app-list-tournamets',
  standalone: false,
  templateUrl: './list-tournamets.component.html',
  styleUrl: './list-tournamets.component.css'
})
export class ListTournametsComponent implements OnInit {

    showCreateModal: boolean = false;
  
    constructor(
      private tournamentService: TournamentsService,
    ) { }
  
    tournaments: Tournaments[] = [];
  
    ngOnInit(): void {
      this.bringTournaments();
    }
  
    bringTournaments(): void {
      this.tournamentService.getTournaments().subscribe({
        next: (data) => {
          this.tournaments = data;
        },
        error: () => {

        }
      });
    }
  
    // openCreate(): void {
    //   this.showCreateModal = true;
    // }

}
