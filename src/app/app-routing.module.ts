import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LogoutActivateGuard } from './guards/logout-activate.guard';
import { LoginActivateGuard } from './guards/login-activate.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { Route } from '@angular/router';

const routes: Route[] = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LogoutActivateGuard]
  },
  {
    path: 'products',
    component: ProductsPageComponent,
    canActivate: [LoginActivateGuard]
  },
  {
    path: 'products/add',
    component: ProductFormComponent,
    canActivate: [LoginActivateGuard]
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    canActivate: [LoginActivateGuard],
    // resolve: {
    //   post: PostResolve
    // }
  },
  { path: '', pathMatch: 'full', redirectTo: 'posts' },
  { path: '**', pathMatch: 'full', redirectTo: 'posts' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
