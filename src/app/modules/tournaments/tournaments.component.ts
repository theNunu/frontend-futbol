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
}
