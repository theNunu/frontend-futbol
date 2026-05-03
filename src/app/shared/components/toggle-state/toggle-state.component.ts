import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-state',
  standalone: false,
  templateUrl: './toggle-state.component.html',
  styleUrl: './toggle-state.component.css'
})
export class ToggleStateComponent {

  @Input() active: boolean = false;
  @Input() idId: number = 0; 
  @Output() onToggle = new EventEmitter<{id: number, status: boolean}>();

  toggle() {
    this.onToggle.emit({ id: this.idId, status: !this.active });
  }

}
