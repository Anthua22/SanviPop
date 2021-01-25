
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { User } from 'src/app/users/interfaces/user';
import { AuthService } from '../services/auth.service';
import { GeolocalitationService } from '../services/geolocalitation.service';

@Component({
  selector: 'sp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() add = new EventEmitter<User>();
  newUser!: User;
  repeatemail!: string;
  photoFile!: string;
  message: string = '';
  @ViewChild('errorSwal')
  public readonly errorSwal!: SwalComponent;
  constructor(private authService: AuthService,
    private router: Router,
    private geolocationService: GeolocalitationService,
    public readonly swalTargets: SwalPortalTargets) {

  }

  ngOnInit(): void {
    this.newUser = {
      photo: '',
      name: '',
      lat: 0,
      lng: 0,
      password: '',
      email: ''
    };
    this.photoFile = '';

    this.geolocationService.getLocation().then(x => {
      this.newUser.lat = x.latitude;
      this.newUser.lng = x.longitude;
    }).catch(
      x => {
        this.message = 'You need to give your location in order to register';
        this.errorSwal.fire();
      }
    );


  }


  changeImage(fileInput: HTMLInputElement): void {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.newUser.photo = reader.result as string;
    });
  }

  register(): void {
    this.authService.register(this.newUser).subscribe(
      user => {

        this.router.navigate(['/auth/login']);
      },
      err=>{

      }
    )
  }




}
