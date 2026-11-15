import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhasesRoutingModule } from './phases-routing.module';
import { FormPhasesComponent } from './components/form-phases/form-phases.component';
import { ListPhasesComponent } from './pages/list-phases/list-phases.component';
import { CreatePhasesComponent } from './pages/create-phases/create-phases.component';
import { UpdatePhasesComponent } from './pages/update-phases/update-phases.component';
// PrimeNG Modules (COPIAR Y PEGAR)
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api'; // 1. Importar desde primeng/api
import { InputSwitchModule } from 'primeng/inputswitch'; // Importar módulo
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
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
    PhasesRoutingModule,
    //IMPORTACIONES DE PRIMENG  (COPIAR Y PEGAR)
    TableModule,
    ButtonModule,// 2. Agrégalo aquí para que ListSeasonComponent pueda usarlo
    InputTextModule,
    TextareaModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    ReactiveFormsModule, // PARA LOS FORMULARIOS
    DropdownModule // <-- Asegúrate de incluirlo aquí SELECT DE PRIMENG
  ]
})
export class PhasesModule { }
