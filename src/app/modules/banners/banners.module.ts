import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannersRoutingModule } from './banners-routing.module';
import { ListBannersComponent } from './pages/list-banners/list-banners.component';
import { CreateBannersComponent } from './pages/create-banners/create-banners.component';
import { UpdateBannersComponent } from './pages/update-banners/update-banners.component';
import { FormBannersComponent } from './pages/componens/form-banners/form-banners.component';


@NgModule({
  declarations: [
    ListBannersComponent,
    CreateBannersComponent,
    UpdateBannersComponent,
    FormBannersComponent
  ],
  imports: [
    CommonModule,
    BannersRoutingModule
  ]
})
export class BannersModule { }
