import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleAdminRoutingModule } from './module-admin-routing.module';
import { ModuleAdminComponent } from './module-admin.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    ModuleAdminComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ModuleAdminRoutingModule,
    RouterModule
  ]
})
export class ModuleAdminModule { }
