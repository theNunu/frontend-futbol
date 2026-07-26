import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dtoNews, News } from '../../interfaces/data';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-form-news',
  standalone: false,
  templateUrl: './form-news.component.html',
  styleUrl: './form-news.component.css'
})
export class FormNewsComponent implements OnInit {
  formNews!: FormGroup;
  // formNews: FormGroup = this.initForm();
  isEditMode: boolean = false;

  @Output() saved = new EventEmitter<dtoNews>();
  @Input() btnGuardarEnabled: boolean = true;
  // Reemplazamos el constructor problemático por un Input limpio
  // @Input() dataNews: News | null = null; 
  // @Input() dataNews!: News;
  @Input() dataNews: News | null = null;
  //  @Output() saved: EventEmitter<VehiculoInsertI> = new EventEmitter();

  isUploading: boolean = false; //
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(

    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormNewsComponent>,

    // Recibimos los datos del componente padre (si se va a editar)
    // @Inject(MAT_DIALOG_DATA) public dataNews: News | null
    // private dataNews: News | null,
  ) { }

  ngOnInit(): void {
    // 3. ¡AQUÍ SÍ! Invocamos el método. _formBuilder ya existe al 100%
    this.formNews = this.initForm();
    // this.initForm();

    // 2. ¡ESTO ES LO QUE TE FALTA!: Si dataNews tiene información, inyéctala en el formulario
    if (this.dataNews) {
      this.formNews.patchValue(this.dataNews);
      // O si las propiedades mapean distinto, campo por campo:
      // this.newsForm.patchValue({
      //    title: this.dataNews.title,
      //    summary: this.dataNews.summary
    }
  }

  initForm(): FormGroup {

    return this.fb.group({
      title: [this.dataNews?.title, [Validators.required, Validators.maxLength(30)]],
      summary: ['', [Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.maxLength(60)]],
      begin_date: [this.dataNews?.begin_date ? new Date(this.dataNews.begin_date) : null, [Validators.required]],
      end_date: [this.dataNews?.end_date ? new Date(this.dataNews.end_date) : null, [Validators.required]],
      file_id: [this.dataNews?.file_id ?? null] // Guardará el ID que devuelva el endpoint /api/files
      // title: [this.dataNews?.title || '', [Validators.required]],
      // summary: [this.dataNews?.summary || '', [Validators.required]],
      // description: [this.dataNews?.description || '', [Validators.required]],
      // ... los demás campos de tu formulario
    });

    // this.formNews = this.fb.group({
    //   //summary: [this.dataNews?.summary || '', [Validators.required]],
    //   title: [this.dataNews?.title, [Validators.required, Validators.maxLength(30)]],
    //   summary: ['', [Validators.minLength(10)]],
    //   description: ['', [Validators.required, Validators.minLength(10)]],
    //   begin_date: [this.dataNews?.begin_date ? new Date(this.dataNews.begin_date) : null, [Validators.required]],
    //   end_date: [this.dataNews?.end_date ? new Date(this.dataNews.end_date) : null, [Validators.required]],


    // });
  }

  private formatDate(date: unknown): string {

    if (!date) return '';
    const d = new Date(date as string | number | Date);
    if (isNaN(d.getTime())) return ''; // Control extra por si la fecha es inválida

    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  // 1. Detecta cuando el usuario selecciona una imagen en el <input type="file">
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Vista previa de la imagen local en el formulario
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  guardar(): void {
    // console.log(" eso tilin");
    // console.log("rl formu: ", this.formNews.invalid);
    // if (this.formNews.invalid) return;

    console.log("mi noticia", this.formNews);
    if (this.formNews.invalid) {
      this.formNews.markAllAsTouched();
      return; // ❌ Si se ejecuta este return, el evento 'saved' nunca se emite
    }


    // Extraemos los valores del formulario
    const formValues = this.formNews.value;

    // Formateamos las fechas al formato estricto de tu backend: "YYYY-MM-DD"
    const payload = {
      ...formValues,
      begin_date: this.formatDate(formValues.begin_date),
      end_date: this.formatDate(formValues.end_date)
    };

    // ✅ Emitimos un objeto que contiene los datos de la noticia Y el archivo seleccionado
    // this.saved.emit({
    //   data: payload,
    //   file: this.selectedFile
    // });

    // Cerramos el modal devolviendo el payload listo para la API
    // this.dialogRef.close(payload);
    //  this.saved.emit(this.formNews.value);

    // Emitimos el objeto COMPLETAMENTE formateado listo para ir a tu servicio HTTP
    this.saved.emit(payload);
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }

}
