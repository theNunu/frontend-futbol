import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleStateComponent } from './components/toggle-state/toggle-state.component';



@NgModule({
  declarations: [
    ToggleStateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToggleStateComponent
  ]
})
export class SharedModule { }
