import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { ListTournametsComponent } from './pages/list-tournamets/list-tournamets.component';
import { CreateTournametsComponent } from './pages/create-tournamets/create-tournamets.component';
import { UpdateTournametsComponent } from './pages/update-tournamets/update-tournamets.component';
import { FormTournamentsComponent } from './components/form-tournaments/form-tournaments.component';
// PrimeNG Modules
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


@NgModule({
  declarations: [
    ListTournametsComponent,
    CreateTournametsComponent,
    UpdateTournametsComponent,
    FormTournamentsComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    TableModule,
    ButtonModule,// 2. Agrégalo aquí para que ListSeasonComponent pueda usarlo
    InputTextModule,
    TextareaModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
  ]
})
export class TournamentModule { }
