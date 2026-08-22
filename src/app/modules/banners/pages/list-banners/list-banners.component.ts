import { Component } from '@angular/core';
import { BannersService } from '../../services/banners.service';
import { MatDialog } from '@angular/material/dialog';
import { Banners } from '../../interfaces/data';
@Component({
  selector: 'app-list-banners',
  standalone: false,
  templateUrl: './list-banners.component.html',
  styleUrl: './list-banners.component.css'
})
export class ListBannersComponent {

  constructor(
    private bannersService: BannersService,
    private dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: number

  ) { }

  data: Banners[] = [];
  //

  ngOnInit(): void {
    console.log('El componente ListNews se ha inicializado'); // Prueba 1
    this.getBanners();
  }

  getBanners(): void {
    this.bannersService.getBanners().subscribe(datos => {
      this.data = datos;
    });
  }

  getImagenUrl(banner: Banners): string {
    // Caso 1: Si el backend devuelve la relación cargada (objeto 'file')
    // if (noticia.file && noticia.file.path) {
    //   return `${this.newsService.storageUrl}${noticia.file.path}`;
    // }
    // Verificamos si existe el objeto 'files' y si tiene la propiedad 'path'
    if (banner.files && banner.files.path) {
      // Limpiamos cualquier '/' sobrante al inicio
      const cleanPath = banner.files.path.replace(/^\//, '');
      return `${this.bannersService.storageUrl}${cleanPath}`;
    }

    // Caso 2: Si por alguna razón la URL viniera directa
    // if (noticia.image) {
    //   return noticia.image;
    // }

    // Caso 3: Placeholder por defecto si file_id es null o no hay imagen
    return 'assets/no-image.jpg'; // O una URL remota de placeholder
  }

}
