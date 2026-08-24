import { Component, EventEmitter, Input, OnInit, Output , SimpleChanges, OnChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BannerDto } from '../../interfaces/data';

@Component({
  selector: 'app-form-banners',
  standalone: false,
  templateUrl: './form-banners.component.html',
  styleUrl: './form-banners.component.css'
})
export class FormBannersComponent  implements OnInit , OnChanges{

  
  @Input() dataBanner: BannerDto | null = null;
  @Input() isSubmitting: boolean = false;

  @Output() onSave = new EventEmitter<BannerDto>();
  @Output() onCancel = new EventEmitter<void>();

  bannerForm!: FormGroup; //llamarse en el renderizao (html)
   

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    if (this.dataBanner) {
      this.bannerForm.patchValue(this.dataBanner);
    }
  }

  // Escucha si el @Input() dataNoticia cambia en tiempo de ejecución
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataNoticia'] && !changes['dataNoticia'].isFirstChange()) {
      if (this.dataBanner) {
        this.bannerForm?.patchValue(this.dataBanner);
      } else {
        this.bannerForm?.reset(); // Si se vuelve null, reseteamos a vacío (modo crear)
      }
    }
  }

   selectedFile: File | null = null;
   
    onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // 👈 AQUÍ SE GUARDA EL ARCHIVO REAL
      console.log('Imagen capturada correctamente:', this.selectedFile);
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
    this.onSave.emit(this.bannerForm.value);
  }

  cancel(): void {
    this.onCancel.emit();
  }

}
