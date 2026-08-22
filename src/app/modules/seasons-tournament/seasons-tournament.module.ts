import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonsTournamentRoutingModule } from './seasons-tournament-routing.module';
import { ListSeasonComponent } from './pages/list-season/list-season.component';
import { CreateSeasonComponent } from './pages/create-season/create-season.component';
import { UpdateSeasonComponent } from './pages/update-season/update-season.component';
import { FormSeasonsComponent } from './components/form-seasons/form-seasons.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { TableModule } from 'primeng/table';

// import { FormsModule } from '@angular/forms'; // 1. Importa el módulo
// // 1. Importa el módulo de PrimeNG aquí arriba
// import { ButtonModule } from 'primeng/button';


// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api'; // 1. Importar desde primeng/api
@NgModule({
  declarations: [
    ListSeasonComponent,
    CreateSeasonComponent,
    UpdateSeasonComponent,
    FormSeasonsComponent
  ],
  imports: [
    CommonModule,
    SeasonsTournamentRoutingModule,
    ReactiveFormsModule,
    // FormsModule,
    // TableModule,
    // ButtonModule, // 2. Agrégalo aquí para que ListSeasonComponent pueda usarlo

    // PrimeNG
    TableModule,
    ButtonModule,// 2. Agrégalo aquí para que ListSeasonComponent pueda usarlo
    InputTextModule,
    TextareaModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    MessageService,      // 2. Registrar aquí el servicio
    ConfirmationService  // (Aprovecha de registrar también este si usas ConfirmDialog)
  ]
})
export class SeasonsTournamentModule { }
