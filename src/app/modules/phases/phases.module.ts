import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhasesRoutingModule } from './phases-routing.module';
import { FormPhasesComponent } from './components/form-phases/form-phases.component';
import { ListPhasesComponent } from './pages/list-phases/list-phases.component';
import { CreatePhasesComponent } from './pages/create-phases/create-phases.component';
import { UpdatePhasesComponent } from './pages/update-phases/update-phases.component';


@NgModule({
  declarations: [
    // FormBannersComponent,
    FormPhasesComponent,
    ListPhasesComponent,
    CreatePhasesComponent,
    UpdatePhasesComponent
  ],
  imports: [
    CommonModule,
    PhasesRoutingModule
  ]
})
export class PhasesModule { }
