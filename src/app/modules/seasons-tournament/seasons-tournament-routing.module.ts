import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSeasonComponent } from './pages/list-season/list-season.component';

const routes: Routes = [
    {
      path: '',
      component: ListSeasonComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeasonsTournamentRoutingModule { }
