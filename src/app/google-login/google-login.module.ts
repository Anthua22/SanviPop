import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CLIENT_ID } from './google-login.config';
import {  GoogleLoginDirective } from './directives/google-login.directive';



@NgModule({
  declarations: [GoogleLoginDirective],
  exports: [GoogleLoginDirective],
  imports: [CommonModule]

})
export class GoogleLoginModule {
  static forRoot(clientId: string): ModuleWithProviders<GoogleLoginModule> {
    return {
      ngModule: GoogleLoginModule,
      providers: [
        { provide: CLIENT_ID, useValue: clientId }
      ]
    };
  }
}
