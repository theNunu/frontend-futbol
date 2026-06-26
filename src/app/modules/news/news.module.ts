import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { MatTableModule } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator'; // 1. Importa el módulo
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { FormNewsComponent } from './components/form-news/form-news.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

// 2. IMPORTA TODOS LOS MÓDULOS DE MATERIAL QUE USA EL FORMULARIO
import { MatFormFieldModule } from '@angular/material/form-field'; // <-- Para <mat-form-field>
import { MatInputModule } from '@angular/material/input';         // <-- Para el input con matInput
import { MatDatepickerModule } from '@angular/material/datepicker'; // <-- Para el calendario
import { MatNativeDateModule } from '@angular/material/core';     // <-- Para que el calendario entienda fechas nativas
import { FormsModule } from '@angular/forms'; // 1. Importa el módulo

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select'; // En PrimeNG v19 se llama SelectModule

@NgModule({
  declarations: [
    NewsComponent,
    FormNewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FormsModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    ReactiveFormsModule ,

    // Módulos de Angular Material
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,

    //para uso de primeng (buscador de noticia)
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SelectModule
    
    
  ],
  // exports:[NewsComponent]
})
export class NewsModule { }
