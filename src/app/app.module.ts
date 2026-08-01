import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { HttpClientModule } from '@angular/common/http';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
// import { CreateOrEditComponent } from './modules/seasons/create-or-edit/create-or-edit.component';
// import { SeasonsModule } from './modules/seasons/seasons.module';
import { NewsModule } from './modules/news/news.module';

import { providePrimeNG } from 'primeng/config'; // Importación de PrimeNG v19
import Aura from '@primeng/themes/aura'; // Tema visual moderno de PrimeNG v19
@NgModule({
  declarations: [
    AppComponent,
    TournamentsComponent,
    // CreateOrEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // Asegúrate de que esté aquí para activar los estilos dinámicos
    TournamentsModule,
    // SeasonsModule,
    BrowserAnimationsModule,
    NewsModule
  ],
  providers: [
    // Aquí es donde PrimeNG v19 inyecta los estilos automáticamente en arquitecturas de módulos
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'none' // 👈 ESTO DESACTIVA EL MODO OSCURO POR COMPLETO
        }
      },

    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
