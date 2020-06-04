import { ProductCreateComponent } from './components/product/user-create/user-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductUpdateComponent } from './components/product/user-update/user-update.component';
import { ProductDeleteComponent } from './components/product/user-delete/user-delete.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "products",
    component: ProductCrudComponent
  },
  {
    path: "products/create",
    component: ProductCreateComponent
  },
  {
    path: 'products/update/:id',
    component: ProductUpdateComponent
  },
  {
    path: 'products/delete/:id',
    component: ProductDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
