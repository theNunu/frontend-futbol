import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { ListTournametsComponent } from './pages/list-tournamets/list-tournamets.component';
import { CreateTournametsComponent } from './pages/create-tournamets/create-tournamets.component';
import { UpdateTournametsComponent } from './pages/update-tournamets/update-tournamets.component';
import { FormTournamentsComponent } from './components/form-tournaments/form-tournaments.component';


@NgModule({
  declarations: [
    ListTournametsComponent,
    CreateTournametsComponent,
    UpdateTournametsComponent,
    FormTournamentsComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule
  ]
})
export class TournamentModule { }
