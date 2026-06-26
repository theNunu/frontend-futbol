import { Component, OnInit } from '@angular/core';
import { ModuleItem } from '../../interfaces/module-item';
import { ModuleAdminService } from '../../services/module-admin.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  menuItems: ModuleItem[] = [];

  constructor(private sidebarService: ModuleAdminService) { }

  ngOnInit(): void {
    // Consumimos el endpoint de Laravel
    this.sidebarService.getSidebarMenu().subscribe({
      next: (data) => {
        // Guardamos los módulos y nos aseguramos de que todos inicien cerrados
        this.menuItems = data.map(item => ({ ...item, isOpen: false }));
      },
      error: (err) => console.error('Error al cargar el menú', err)
    });
  }

  // Abre o cierra un menú padre de forma totalmente independiente
  toggleParent(parent: ModuleItem): void {
    if (parent.children && parent.children.length > 0) {
      parent.isOpen = !parent.isOpen;
    }
  }

}
