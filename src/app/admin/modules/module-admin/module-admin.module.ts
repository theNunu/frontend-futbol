import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleAdminRoutingModule } from './module-admin-routing.module';
import { ModuleAdminComponent } from './module-admin.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ModuleAdminComponent
  ],
  imports: [
    CommonModule,
    // ModuleAdminRoutingModule,
    RouterModule
  ]
})
export class ModuleAdminModule { }
