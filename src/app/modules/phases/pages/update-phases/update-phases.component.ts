import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Phase, PhaseCreatePayload } from '../../interfaces/data';
import { PhasesService } from '../../services/phases.service';
@Component({
  selector: 'app-update-phases',
  standalone: false,
  templateUrl: './update-phases.component.html',
  styleUrl: './update-phases.component.css'
})
export class UpdatePhasesComponent implements OnInit {
  // Recibimos la fase seleccionada desde el componente padre (el listado / modal principal)
  @Input() phaseData!: Phase;
  
  // Evento para notificar al componente padre que se actualizó con éxito o se canceló
  @Output() onSaved = new EventEmitter<void>();
  @Output() onClosed = new EventEmitter<void>();

  phaseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private phasesService: PhasesService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.phaseForm = this.fb.group({
      tournament_id: [this.phaseData?.tournament_id || '', [Validators.required, Validators.min(1)]],
      name: [this.phaseData?.name || '', [Validators.required, Validators.minLength(3)]],
      order: [this.phaseData?.order || 1, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.phaseForm.invalid || !this.phaseData) return;

    const payload: PhaseCreatePayload = this.phaseForm.value;

    this.phasesService.updatePhase(this.phaseData.phase_id, payload).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Fase actualizada correctamente', response.data);
          this.onSaved.emit(); // Notificamos para refrescar la tabla/modal
        }
      },
      error: (error) => {
        console.error('Error al actualizar la fase:', error);
      }
    });
  }

  onCancel(): void {
    this.onClosed.emit();
  }
}