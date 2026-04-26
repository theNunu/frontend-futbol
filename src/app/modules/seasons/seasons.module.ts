import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonsRoutingModule } from './seasons-routing.module';
import { SeasonsComponent } from './seasons.component';
import { CreateOrEditComponent } from './create-or-edit/create-or-edit.component';


@NgModule({
  declarations: [
    SeasonsComponent,
    CreateOrEditComponent
  ],
  imports: [
    CommonModule,
    SeasonsRoutingModule
  ]
})
export class SeasonsModule { }
