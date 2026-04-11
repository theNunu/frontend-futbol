import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import '@angular/compiler'; // <--- Añade esto arriba del todo

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
