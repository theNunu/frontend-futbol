import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleStateComponent } from './components/toggle-state/toggle-state.component';
import { FacePruebaComponent } from './components/face-prueba/face-prueba.component';



@NgModule({
  declarations: [
    ToggleStateComponent,
    FacePruebaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToggleStateComponent,
     FacePruebaComponent //todo lo nuevo debe importarse aqui para que pueda ser llamado
  ]
})
export class SharedModule { }
