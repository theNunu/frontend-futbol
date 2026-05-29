import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { HttpClientModule } from '@angular/common/http';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { CreateOrEditComponent } from './modules/seasons/create-or-edit/create-or-edit.component';
import { SeasonsModule } from './modules/seasons/seasons.module';
import { NewsModule } from './modules/news/news.module';

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
    TournamentsModule,
    SeasonsModule,
    BrowserAnimationsModule,
    NewsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
