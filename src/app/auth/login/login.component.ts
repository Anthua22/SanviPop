import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { User } from 'src/app/users/interfaces/user';
import { AuthService } from '../services/auth.service';
import { GeolocalitationService } from '../services/geolocalitation.service';

import { faUser as fasUser } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User;
  constructor(private geolocation: GeolocalitationService, private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.user = {
      password: '',
      lat: 0,
      lng: 0,
      email: ''
    }
    this.getCoordinates();
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

  loggedGoogle(user: gapi.auth2.GoogleUser) {

    console.log(user.getAuthResponse().id_token);
    this.authService.loginGoogle(user.getAuthResponse().id_token).subscribe(x=>{
      this.router.navigate(['/products']);
    })
  }

}
