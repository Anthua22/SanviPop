import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { MenuModule } from './menu/menu.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleLoginModule } from './google-login/google-login.module';
import { FacebookLoginModule } from './facebook-login/facebook-login.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MenuModule,
    FontAwesomeModule,
    GoogleLoginModule.forRoot('667204529710-2b9jd5idoqepfe6ahpq3qo9kvtkmpdcb.apps.googleusercontent.com'),
    FacebookLoginModule.forRoot({
      app_id:'401208517850489',
      version:'v9.0'
    }),
    NgxMapboxGLModule.withConfig({
      accessToken:'pk.eyJ1IjoiYW50aG9ueXViaSIsImEiOiJja2dtODlnMjAwYWQ2MnRqbzNlY29ib282In0.wi12UKThrEvuKZ5nWCxq8g'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
