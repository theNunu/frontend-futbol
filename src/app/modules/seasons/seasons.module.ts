import { NgModule } from '@angular/core';


import { SeasonsRoutingModule } from './seasons-routing.module';
import { SeasonsComponent } from './seasons.component';
// import { CreateOrEditComponent } from './create-or-edit/create-or-edit.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    SeasonsComponent,
    // CreateOrEditComponent
  ],
  imports: [
    CommonModule,   
    SeasonsRoutingModule
  ]
})
export class SeasonsModule { }
