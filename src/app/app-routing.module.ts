import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentService } from './services/tournament.service';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';

const routes: Routes = [
  {
    path: 'tournaments',
    loadChildren: () => import('./modules/tournaments/tournaments.module').then(m => m.TournamentsModule)
  },

  // {
  //   path: 'products/:id',
  //   component: TournamentService
  // },

  {
    path: '',
    redirectTo: '/tournaments',
    pathMatch: 'full'
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
