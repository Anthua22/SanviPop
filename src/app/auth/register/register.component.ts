
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { User } from 'src/app/users/interfaces/user';
import { matchEmail } from 'src/app/validators/match-email';
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
  registerForm!: FormGroup;
  @ViewChild('errorSwal')
  public readonly errorSwal!: SwalComponent;

  constructor(private authService: AuthService,
    private router: Router,
    private geolocationService: GeolocalitationService,
    public readonly swalTargets: SwalPortalTargets,
    private fb: FormBuilder) {

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
    this.createForm();
    this.geolocationService.getLocation().then(x => {
      this.newUser.lat = x.latitude;
      this.newUser.lng = x.longitude;

      this.registerForm.get('latitude')?.setValue( this.newUser.lat);
      this.registerForm.get('longitude')?.setValue( this.newUser.lng);
    }).catch(
      x => {
        this.message = 'You need to give your location in order to register';
        this.errorSwal.fire();
      }
    );


  }

  private createForm(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        emailConfirm: ['', [Validators.required, Validators.email]]
      }, { validator: matchEmail }),
      password: ['', [Validators.required, Validators.minLength(4)]],
      latitude: ['',[Validators.required]],
      longitude: ['',[Validators.required]],
      avatar:['',[Validators.required]]
    })

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
    this.newUser.email = this.registerForm.get('emailGroup')?.get('email')?.value as string;
    this.newUser.name =  this.registerForm.get('name')?.value as string;
    this.newUser.password =  this.registerForm.get('password')?.value as string;
    this.authService.register(this.newUser).subscribe(
      user => {

        this.router.navigate(['/auth/login']);
      },
      err => {
        this.message = err;
        this.errorSwal.fire();
      }
    )
  }




}
