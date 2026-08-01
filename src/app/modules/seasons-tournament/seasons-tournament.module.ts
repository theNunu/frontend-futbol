import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonsTournamentRoutingModule } from './seasons-tournament-routing.module';
import { ListSeasonComponent } from './pages/list-season/list-season.component';
import { CreateSeasonComponent } from './pages/create-season/create-season.component';
import { UpdateSeasonComponent } from './pages/update-season/update-season.component';
import { FormSeasonsComponent } from './components/form-seasons/form-seasons.component';

// import { TableModule } from 'primeng/table'; // 👈 1. Importación obligatoria
import { TableModule, Table } from 'primeng/table';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; // <-- Para <mat-form-field>
import { MatInputModule } from '@angular/material/input';         // <-- Para el input con matInput
import { MatDatepickerModule } from '@angular/material/datepicker'; // <-- Para el calendario
import { MatNativeDateModule } from '@angular/material/core';     // <-- Para que el calendario entienda fechas nativas
import { FormsModule } from '@angular/forms'; // 1. Importa el módulo

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
// import { ListNewsComponent } from './pages/list-news/list-news.component';
// import { CreateNewsComponent } from './pages/create-news/create-news.component';
// import { UpdateNewsComponent } from './pages/update-news/update-news.component'; 

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
    FormsModule,
    TableModule,
    Table
    // Table
    // MatTableModule,
    // //     // Módulos de Angular Material
    // MatPaginatorModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatButtonModule,
    // MatDialogModule,
    // MatDatepickerModule,
    // MatNativeDateModule,

    // //para uso de primeng (buscador de noticia)
    // IconFieldModule,
    // InputIconModule,
    // InputTextModule,
    // SelectModule
  ]
})
export class SeasonsTournamentModule { }
