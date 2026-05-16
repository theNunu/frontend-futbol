import { NgModule } from '@angular/core';


import { SeasonsRoutingModule } from './seasons-routing.module';
import { SeasonsComponent } from './seasons.component';
// import { CreateOrEditComponent } from './create-or-edit/create-or-edit.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateOrEditComponent } from './create-or-edit/create-or-edit.component';

@NgModule({
  declarations: [
    SeasonsComponent,
    CreateOrEditComponent
  ],
  imports: [
    CommonModule,   
    SeasonsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SeasonsModule { }
