import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { UserComponent } from './views/user/user.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "users",
    component: UserComponent
  },
  {
    path: "users/create",
    component: UserCreateComponent
  },
  {
    path: 'users/update/:id',
    component: UserUpdateComponent
  },
  {
    path: 'users/delete/:id',
    component: UserDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
