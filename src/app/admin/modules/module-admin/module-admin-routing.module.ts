import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleAdminComponent } from './module-admin.component';
// import { SeasonsComponent } from '../../../modules/seasons/seasons.component';
import { NewsComponent } from '../../../modules/news/news.component';
import { ListNewsComponent } from '../../../modules/news/pages/list-news/list-news.component';
import { ListSeasonComponent } from '../../../modules/seasons-tournament/pages/list-season/list-season.component';
import { ListBannersComponent } from '../../../modules/banners/pages/list-banners/list-banners.component';
import { ListTournametsComponent } from '../../../modules/tournament/pages/list-tournamets/list-tournamets.component';

const routes: Routes = [

  {
    path: '',
    component: ModuleAdminComponent, // Este componente tiene tu <app-sidebar>
    children: [
      // OJO: Como el padre en el app-routing principal ya es 'admin', aquí solo pones el resto de la URL
      { path: 'news/list', component: ListNewsComponent },
      { path: 'seasons/list', component: ListSeasonComponent },
      { path: 'banners/list', component: ListBannersComponent },
      { path: 'tournaments/list', component: ListTournametsComponent },

      // Ruta por defecto por si entran solo a /admin
      { path: '', redirectTo: 'news', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleAdminRoutingModule {


}
