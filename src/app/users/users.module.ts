import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UsersRoutingModule } from './users-routing.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { UsereditComponent } from './useredit/useredit.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProfileComponent, UsereditComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgxMapboxGLModule,
    FormsModule
  ]
})
export class UsersModule { }
