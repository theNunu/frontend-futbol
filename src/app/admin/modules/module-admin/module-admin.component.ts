import { Component, inject } from '@angular/core';
import { ModuleItem } from './interfaces/module-item';
import { ModuleAdminService } from './services/module-admin.service';

@Component({
  selector: 'app-module-admin',
  standalone: false,
  templateUrl: './module-admin.component.html',
  styleUrl: './module-admin.component.css'
})
export class ModuleAdminComponent {
  // En tu componente:
 constructor() { }

  ngOnInit(): void {
    // Aquí no necesitas meter lógica pesada, su función es puramente estructural
  }
}
