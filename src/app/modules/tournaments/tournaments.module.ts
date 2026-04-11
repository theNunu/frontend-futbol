import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentsRoutingModule } from './tournaments-routing.module';
import { CreateOrEditComponent } from './create-or-edit/create-or-edit.component';
import { TournamentsComponent } from './tournaments.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateOrEditComponent,
    TournamentsComponent
  ],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    ReactiveFormsModule
    
  ]
})
export class TournamentsModule { }
