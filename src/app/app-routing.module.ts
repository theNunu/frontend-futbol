import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentService } from './services/tournament.service';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';

const routes: Routes = [
  // {
  //   path: 'tournaments',
  //   loadChildren: () => import('./modules/tournaments/tournaments.module').then(m => m.TournamentsModule)
  // },

  //  {
  //   path: 'tournaments',
  //   loadChildren: () => import('./modules/tournaments/tournaments.module').then(m => m.ModuleAdminModule)
  // },

  // {
  //   path: 'products/:id',
  //   component: TournamentService
  // },
  {
    path: 'admin',
    // Aquí le dices a Angular que cargue tu módulo administrativo de forma perezosa
    loadChildren: () => import('./admin/modules/module-admin/module-admin-routing.module').then(m => m.ModuleAdminRoutingModule)
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  }
  // {
  //   path: '',
  //   redirectTo: '/tournaments',
  //   pathMatch: 'full'
  // },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
