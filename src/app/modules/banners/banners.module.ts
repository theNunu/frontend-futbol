import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannersRoutingModule } from './banners-routing.module';
import { ListBannersComponent } from './pages/list-banners/list-banners.component';
import { CreateBannersComponent } from './pages/create-banners/create-banners.component';
import { UpdateBannersComponent } from './pages/update-banners/update-banners.component';
// import { FormBannersComponent } from './pages/componens/form-banners/form-banners.component';
import { FormBannersComponent } from './components/form-banners/form-banners.component';
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
    ListBannersComponent,
    CreateBannersComponent,
    UpdateBannersComponent,
    FormBannersComponent
    // FormBannersComponent
  ],
  imports: [
    CommonModule,
    BannersRoutingModule,
      ReactiveFormsModule, // PARA LOS FORMULARIOS
        // PrimeNG
        TableModule,
        ButtonModule,// 2. Agrégalo aquí para que ListSeasonComponent pueda usarlo
        InputTextModule,
        TextareaModule,
        DialogModule,
        ToastModule,
        ConfirmDialogModule,
        InputSwitchModule // <-- Registrar aquí
        
  ],
  providers: [
    MessageService,      // 2. Registrar aquí el servicio
    ConfirmationService  // (Aprovecha de registrar también este si usas ConfirmDialog)
  ]
})
export class BannersModule { }
