import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/users/interfaces/user';
import { AuthService } from '../services/auth.service';
import { GeolocalitationService } from '../services/geolocalitation.service';

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() add = new EventEmitter<User>();
  user!: User;
  constructor(private geolocation: GeolocalitationService, private router: Router, private authService: AuthService) { }

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
      localStorage.setItem('token', x);
      this.router.navigate(['/products']);
    });

  }
}
