import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTournametsComponent } from './pages/list-tournamets/list-tournamets.component';

const routes: Routes = [

  {
    path: '',
    component: ListTournametsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
