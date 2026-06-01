import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { News } from '../../../interfaces/data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { News } from '../../interfaces/data';
@Component({
  selector: 'app-form-news',
  standalone: false,
  templateUrl: './form-news.component.html',
  styleUrl: './form-news.component.css'
})
export class FormNewsComponent implements OnInit {
  formNews!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormNewsComponent>,
    // Recibimos los datos del componente padre (si se va a editar)
    @Inject(MAT_DIALOG_DATA) public dataNews: News | null
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!this.dataNews; // Si hay data, es modo edición
    this.initForm();
  }

  initForm(): void {
    this.formNews = this.fb.group({
      title: [this.dataNews?.title || '', [Validators.required], Validators.maxLength(30)],
      // Summary es opcional, así que no lleva Validators.required
      summary: [this.dataNews?.summary || ''],
      description: [this.dataNews?.description || '', [Validators.required]],
      // Los datepickers de Material manejan objetos Date nativos internamente
      begin_date: [this.dataNews?.begin_date ? new Date(this.dataNews.begin_date) : '', [Validators.required]],
      end_date: [this.dataNews?.end_date ? new Date(this.dataNews.end_date) : '', [Validators.required]]
    });
  }

  private formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  guardar(): void {
    console.log(" eso tilin");
    console.log("rl formu: ", this.formNews.invalid);
    if (this.formNews.invalid) return;



    // Extraemos los valores del formulario
    const formValues = this.formNews.value;

    // Formateamos las fechas al formato estricto de tu backend: "YYYY-MM-DD"
    const payload = {
      ...formValues,
      begin_date: this.formatDate(formValues.begin_date),
      end_date: this.formatDate(formValues.end_date)
    };

    // Cerramos el modal devolviendo el payload listo para la API
    this.dialogRef.close(payload);
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }

}
