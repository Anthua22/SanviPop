import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { User } from 'src/app/users/interfaces/user';
import { AuthService } from '../services/auth.service';
import { GeolocalitationService } from '../services/geolocalitation.service';

import {faGoogle } from '@fortawesome/free-brands-svg-icons';
import {faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User;
  constructor(private geolocation: GeolocalitationService, private library: FaIconLibrary ,private ngZone:NgZone,private router: Router, private authService: AuthService) {
    library.addIcons(faGoogle);
    library.addIcons(faFacebook);

  }

  ngOnInit(): void {
    this.user = {
      password: '',
      lat: 0,
      lng: 0,
      email: ''
    }
    this.getCoordinates();
    //console.log(this.user)
  }

  async getCoordinates(): Promise<void> {
    try {
      let coordinates: Coordinates = await this.geolocation.getLocation();
      this.user.lat = coordinates.latitude;
      this.user.lng = coordinates.longitude;
    } catch (err: any) {
      console.error(err);
    }
  }

  login() {
    this.authService.login(this.user).subscribe(x => {
      this.router.navigate(['/products']);
    });

  }

  loggedGoogle(usergoogle: gapi.auth2.GoogleUser) {
    this.ngZone.run(() => {
      let token = usergoogle.getAuthResponse().id_token;
      this.authService.loginGoogle(token).subscribe(x => {
        this.router.navigate(['/products']);
      })
    })

  }



  loggedFacebook(resp: fb.StatusResponse) {
    // Send this to your server

    this.authService.loginFacebook(resp.authResponse.accessToken).subscribe(x => {
      this.router.navigate(['/products']);
    });

  }
  showError(error: any) {
    console.error(error);
  }

}
