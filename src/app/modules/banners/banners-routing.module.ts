import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBannersComponent } from './pages/list-banners/list-banners.component';

const routes: Routes = [
  {
    path: '',
    component: ListBannersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannersRoutingModule { }
