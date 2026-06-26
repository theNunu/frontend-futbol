import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNewsComponent } from './pages/list-news/list-news.component';

const routes: Routes = [
  {
    path: '',
    component: ListNewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
