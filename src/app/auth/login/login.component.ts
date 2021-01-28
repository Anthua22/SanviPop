import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { User } from 'src/app/users/interfaces/user';
import { AuthService } from '../services/auth.service';
import { GeolocalitationService } from '../services/geolocalitation.service';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User;
  message: string = '';
  @ViewChild('errorSwal')
  public readonly errorSwal!: SwalComponent;

  constructor(private geolocation: GeolocalitationService, library: FaIconLibrary, public readonly swalTargets: SwalPortalTargets, private ngZone: NgZone, private router: Router, private authService: AuthService) {
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
    this.authService.login(this.user).subscribe(
      () => {
        this.router.navigate(['/products']);
      },
      err => {
        this.message = err;
        this.errorSwal.fire();
      }
    );

  }

  loggedGoogle(usergoogle: gapi.auth2.GoogleUser) {
    this.ngZone.run(() => {
      let token = usergoogle.getAuthResponse().id_token;
      this.authService.loginGoogle(token).subscribe(() => {
        this.router.navigate(['/products']);
      })
    })

  }



  loggedFacebook(resp: fb.StatusResponse) {
    // Send this to your server
    this.ngZone.run(() => {
      this.authService.loginFacebook(resp.authResponse.accessToken).subscribe(() => {
        this.router.navigate(['/products']);
      });
    })


  }
  showError(error: any) {
    console.error(error);
  }

}
