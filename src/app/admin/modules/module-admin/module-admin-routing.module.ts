import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleAdminComponent } from './module-admin.component';
import { SeasonsComponent } from '../../../modules/seasons/seasons.component';

const routes: Routes = [


  // {
  //   path: 'admin',
  //   component: ModuleAdminComponent, // Este es el diseño que tiene el Sidebar izquierdo
  //   children: [
  //     // Aquí están las rutas hijas del panel de administración
  //     // { path: 'noticias/crear', component: CrearNoticiaComponent },
  //     { path: 'admin/seasons', component: SeasonsComponent },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleAdminRoutingModule {


}
