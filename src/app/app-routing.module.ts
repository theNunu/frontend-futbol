import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentService } from './services/tournament.service';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';

const routes: Routes = [

  {
    path: 'admin',
    // Verifica que la ruta física hacia tu módulo apunte correctamente a donde lo creaste
    loadChildren: () => import('./admin/modules/module-admin/module-admin.module').then(m => m.ModuleAdminModule)
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
