import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/login/registro/registro.component';
import { ListProductComponent } from './components/producto/list-product/list-product.component';
import { AddProductComponent } from './components/producto/add-product/add-product.component';
import { DetailProductComponent } from './components/producto/detail-product/detail-product.component';
import { StarReviewComponent } from './components/star-review/star-review.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'listProduct', component: ListProductComponent},
  {path: 'addProduct', component: AddProductComponent},
  {path: 'detail/:id', component: DetailProductComponent},
  {path: 'voto/:id', component: StarReviewComponent},
  {path: 'das', component: DashboardComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
