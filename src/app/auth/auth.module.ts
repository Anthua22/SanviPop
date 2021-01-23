import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsModule } from '../validators/validators.module';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleLoginModule } from '../google-login/google-login.module';
import { FacebookLoginModule } from '../facebook-login/facebook-login.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ValidatorsModule,
    FormsModule,
    FontAwesomeModule,
    GoogleLoginModule,
    FacebookLoginModule
  ]
})
export class AuthModule { }
