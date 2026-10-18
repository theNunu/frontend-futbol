import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentDto, TournamentDtoResponse } from '../../interfaces/data';

@Component({
  selector: 'app-form-tournaments',
  standalone: false,
  templateUrl: './form-tournaments.component.html',
  styleUrl: './form-tournaments.component.css'
})
export class FormTournamentsComponent implements OnInit, OnChanges {
  @Input() dataTournament: TournamentDto | null = null;
  @Input() isSubmitting: boolean = false;

  // Emite un objeto con los datos y el archivo seleccionado
  @Output() onSave = new EventEmitter<{ data: TournamentDtoResponse }>();
  @Output() onCancel = new EventEmitter<void>();

  tournamentForm!: FormGroup; //llamarse en el renderizao (html)
  // seasons: SeasonSelect[] = [];

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.initForm();
    if (this.dataTournament) {
      this.tournamentForm.patchValue(this.dataTournament);
    }
  }

  // Escucha si el @Input() dataTournament cambia en tiempo de ejecución
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataTournament'] && !changes['dataTournament'].isFirstChange()) {
      if (this.dataTournament) {
        this.tournamentForm?.patchValue(this.dataTournament);
      } else {
        this.tournamentForm?.reset(); // Si se vuelve null, reseteamos a vacío (modo crear)
      }
    }
  }


  private initForm(): void {
    this.tournamentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      season: ['', [Validators.required, Validators.minLength(10)]] // Guarda directamente el ID de la temporada
    });
  }

  submitForm(): void {
    if (this.tournamentForm.invalid) return;
    // Emitimos el objeto completo con la imagen adjunta
    this.onSave.emit({
      data: this.tournamentForm.value
      // file: this.selectedFile
    });
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
