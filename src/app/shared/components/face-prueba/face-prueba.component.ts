import { Component } from '@angular/core';

@Component({
  selector: 'app-face-prueba',
  standalone: false,
  templateUrl: './face-prueba.component.html',
  styleUrl: './face-prueba.component.css'
})
export class FacePruebaComponent {
    isActivo = true; // Estado inicial

  toggleBoton() {
    this.isActivo = !this.isActivo; // Cambia entre true y false
  }

  isActive = true;

  changeIcon() {
    this.isActive = !this.isActive; // Cambia entre true y false
  }
}
