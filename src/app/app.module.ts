import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { HttpClientModule } from '@angular/common/http';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { NewsModule } from './modules/news/news.module';
import { SeasonsTournamentModule } from './modules/seasons-tournament/seasons-tournament.module';


import { providePrimeNG } from 'primeng/config'; // Importación de PrimeNG v19
import Aura from '@primeng/themes/aura'; // Tema visual moderno de PrimeNG v19

// Importa el módulo específico del componente que deseas usar
import { ButtonModule } from 'primeng/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BannersModule } from './modules/banners/banners.module';

@NgModule({
  declarations: [
    AppComponent,
    TournamentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TournamentsModule,
     //PONER TODO MODULE QUE CREE
    NewsModule,
    SeasonsTournamentModule,
    BannersModule,
    ButtonModule // Cargas el módulo del componente aquí para que esté disponible
  ],
  providers: [

    provideAnimationsAsync(), // Requerido para animaciones de componentes
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
