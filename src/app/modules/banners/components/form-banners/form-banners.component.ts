import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BannerDto } from '../../interfaces/data';

@Component({
  selector: 'app-form-banners',
  standalone: false,
  templateUrl: './form-banners.component.html',
  styleUrl: './form-banners.component.css'
})
export class FormBannersComponent implements OnInit, OnChanges {

  @Input() dataBanner: BannerDto | null = null;
  @Input() isSubmitting: boolean = false;

  // Emite un objeto con los datos y el archivo seleccionado
  @Output() onSave = new EventEmitter<{ data: BannerDto, file: File | null }>();
  @Output() onCancel = new EventEmitter<void>();

  selectedFile: File | null = null;

  bannerForm!: FormGroup; //llamarse en el renderizao (html)

  constructor(private fb: FormBuilder) { }

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


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  private initForm(): void {
    this.bannerForm = this.fb.group({
      // name: ['', [Validators.required, Validators.minLength(5)]],
      file_id: [this.dataBanner?.file_id ?? null]
    });
  }

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
