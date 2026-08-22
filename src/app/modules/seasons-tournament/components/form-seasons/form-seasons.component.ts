// import { Component } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output , SimpleChanges, OnChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeasonDto } from '../../interfaces/data';

@Component({
  selector: 'app-form-seasons',
  standalone: false,
  templateUrl: './form-seasons.component.html',
  styleUrl: './form-seasons.component.css'
})
export class FormSeasonsComponent implements OnInit , OnChanges {

  @Input() dataSeason: SeasonDto | null = null;
  @Input() isSubmitting: boolean = false;

  @Output() onSave = new EventEmitter<SeasonDto>();
  @Output() onCancel = new EventEmitter<void>();

  seasonForm!: FormGroup; //llamarse en el renderizao (html)

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    if (this.dataSeason) {
      this.seasonForm.patchValue(this.dataSeason);
    }
  }

  // Escucha si el @Input() dataNoticia cambia en tiempo de ejecución
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataNoticia'] && !changes['dataNoticia'].isFirstChange()) {
      if (this.dataSeason) {
        this.seasonForm?.patchValue(this.dataSeason);
      } else {
        this.seasonForm?.reset(); // Si se vuelve null, reseteamos a vacío (modo crear)
      }
    }
  }

  private initForm(): void {
    this.seasonForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      // summary: ['', [Validators.required, Validators.maxLength(150)]],
      active: ['', [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.seasonForm.invalid) return;
    this.onSave.emit(this.seasonForm.value);
  }

  cancel(): void {
    this.onCancel.emit();
  }

}
