import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LoginactivateguardGuard } from './guards/loginactivateguard.guard';
import { LogoutactivateguardGuard } from './guards/logoutactivateguard.guard';

const routes: Route[] = [
  {
    path: 'products',
    canActivate:[LoginactivateguardGuard],
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  { path: '',canActivate:[LoginactivateguardGuard], pathMatch: 'full', redirectTo: 'products' },

  {
    path:'auth',
    canActivate:[LogoutactivateguardGuard],
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
