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
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaypalButtonModule } from '../paypal-button/paypal-button.module';
import { PhotosproductComponent } from './photosproduct/photosproduct.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MtokmPipe } from './pipes/mtokm.pipe';


@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductsFilterPipe,
    PhotosproductComponent,
    ProductDetailComponent,
    MtokmPipe
  ],
  imports: [

    CommonModule,
    ProductsRoutingModule,
    ValidatorsModule,
    FormsModule,
    NgxMapboxGLModule,
    SweetAlert2Module,
    FontAwesomeModule,
    PaypalButtonModule,
    NgbCarouselModule

  ],
  exports:[
    ProductCardComponent
  ]
})
export class ProductsModule { }
