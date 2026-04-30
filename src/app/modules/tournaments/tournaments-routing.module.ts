import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentsComponent } from './tournaments.component';
import { SeasonsComponent } from '../seasons/seasons.component';

const routes: Routes = [
  {
    path: '',
    component: TournamentsComponent
  },
  {
    path: 'seasons',
    component: SeasonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentsRoutingModule { }
