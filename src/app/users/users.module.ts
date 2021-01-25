import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UsersRoutingModule } from './users-routing.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { UsereditComponent } from './useredit/useredit.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsModule } from '../products/products.module';



@NgModule({
  declarations: [ProfileComponent, UsereditComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgxMapboxGLModule,
    FormsModule,
    SweetAlert2Module,
    NgbNavModule,
    ProductsModule
  ]
})
export class UsersModule { }
