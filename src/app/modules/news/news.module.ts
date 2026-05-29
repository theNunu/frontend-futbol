import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { MatTableModule } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator'; // 1. Importa el módulo



@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    
  ],
  // exports:[NewsComponent]
})
export class NewsModule { }
