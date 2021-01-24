import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditproductGuard } from '../guards/editproduct.guard';
import { LoginactivateguardGuard } from '../guards/loginactivateguard.guard';
import { NumericIdGuard } from '../guards/numeric-id.guard';
import { PageLeaveGuard } from '../guards/page-leave.guard';
import { ProductResolver } from '../resolvers/product.resolver';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsPageComponent } from './products-page/products-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent
  },
  {
    path: 'add',
    component: ProductFormComponent,
    canDeactivate:[PageLeaveGuard]

  },
  {
    path:'edit/:id',
    component:ProductFormComponent,
    canActivate:[NumericIdGuard],
    canDeactivate:[EditproductGuard],
    resolve:{
      product:ProductResolver
    }
  },
  {
    path: ':id',
    component: ProductDetailComponent,
    canActivate: [NumericIdGuard],
    resolve: {
      product: ProductResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
