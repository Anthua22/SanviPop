import { Inject, Injectable, Optional } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CLIENT_ID } from '../google-login.config';

@Injectable({
  providedIn: 'root'
})
export class LoadGoogleApiService {

  private initialized = false;
  // Similar to EventEmitter and replays last emitted values
  private loader$ = new ReplaySubject<gapi.auth2.GoogleAuth>(1);
  private clientId = '';
  constructor(@Optional() @Inject(CLIENT_ID) clientId: string) {
    if (!clientId) {
      throw new Error('GoogleLoginModule: You must call forRoot in your AppModule to pass the CLIENT_ID');
    }
    this.clientId = clientId;
  }

}
