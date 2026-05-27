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
  menuItems: ModuleItem[] = [];

  private menuService = inject(ModuleAdminService);

  ngOnInit() {
    this.menuService.getSidebarMenu().subscribe(data => {
      this.menuItems = data;
    });
  }

  // toggleMenu(item: ModuleItem) {
  //   if (item.children && item.children.length > 0) {
  //     item.isOpen = !item.isOpen; // Abre o cierra el submenú
  //   }
  // }

  // Esta función controla el acordeón de manera independiente
  toggleParent(parent: ModuleItem): void {
    if (parent.children && parent.children.length > 0) {
      parent.isOpen = !parent.isOpen;
    }
  }

}
