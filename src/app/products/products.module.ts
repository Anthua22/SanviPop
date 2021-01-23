import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ValidatorsModule } from '../validators/validators.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductsFilterPipe } from './pipes/products-filter.pipe';
import { FormsModule } from '@angular/forms';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';


@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductsFilterPipe,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ValidatorsModule,
    FormsModule,
    NgxMapboxGLModule
  ]
})
export class ProductsModule { }
