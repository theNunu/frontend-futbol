import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonsTournamentRoutingModule } from './seasons-tournament-routing.module';
import { ListSeasonComponent } from './pages/list-season/list-season.component';
import { CreateSeasonComponent } from './pages/create-season/create-season.component';
import { UpdateSeasonComponent } from './pages/update-season/update-season.component';
import { FormSeasonsComponent } from './components/form-seasons/form-seasons.component';

import { TableModule } from 'primeng/table';

import { FormsModule } from '@angular/forms'; // 1. Importa el módulo
// 1. Importa el módulo de PrimeNG aquí arriba
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ListSeasonComponent,
    CreateSeasonComponent,
    UpdateSeasonComponent,
    FormSeasonsComponent
  ],
  imports: [
    CommonModule,
    SeasonsTournamentRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule // 2. Agrégalo aquí para que ListSeasonComponent pueda usarlo
  ]
})
export class SeasonsTournamentModule { }
