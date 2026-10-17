import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeasonSelect, TournamentDto } from '../../interfaces/data';
import { TournamentService } from '../../../../services/tournament.service';
// import { TournamentService } from '../../../tournaments/services/tournament.service';
// import { TournamentService } from '../../../../services/tournament.service';

@Component({
  selector: 'app-form-tournaments',
  standalone: false,
  templateUrl: './form-tournaments.component.html',
  styleUrl: './form-tournaments.component.css'
})
export class FormTournamentsComponent implements OnInit, OnChanges {
  @Input() dataBanner: TournamentDto | null = null;
  @Input() isSubmitting: boolean = false;

  // Emite un objeto con los datos y el archivo seleccionado
  @Output() onSave = new EventEmitter<{ data: TournamentDto, file: File | null }>();
  @Output() onCancel = new EventEmitter<void>();

  selectedFile: File | null = null;

  bannerForm!: FormGroup; //llamarse en el renderizao (html)
  seasons: SeasonSelect[] = [];

  constructor(private fb: FormBuilder, private tournamentService: TournamentService) {

  }

  ngOnInit(): void {
    this.initForm();
    if (this.dataBanner) {
      this.bannerForm.patchValue(this.dataBanner);
    }
  }

  // Escucha si el @Input() dataBanner cambia en tiempo de ejecución
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataBanner'] && !changes['dataBanner'].isFirstChange()) {
      if (this.dataBanner) {
        this.bannerForm?.patchValue(this.dataBanner);
      } else {
        this.bannerForm?.reset(); // Si se vuelve null, reseteamos a vacío (modo crear)
      }
    }
  }


  private initForm(): void {
    this.bannerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      season_id: [null, [Validators.required]] // Guarda directamente el ID de la temporada
    });
  }

  // private loadSeasons(): void {
  //   this.tournamentService.getSeasons().subscribe({
  //     next: (data) => this.seasons = data,
  //     error: (err) => console.error('Error al cargar temporadas', err)
  //   });
  // }

  submitForm(): void {
    if (this.bannerForm.invalid) return;
    // Emitimos el objeto completo con la imagen adjunta
    this.onSave.emit({
      data: this.bannerForm.value,
      file: this.selectedFile
    });
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
