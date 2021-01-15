import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/users/interfaces/user';

@Component({
  selector: 'sp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() add = new EventEmitter<User>();
  newUser!:User;
  repeatemail!:string;
  photoFile = '';

  constructor() { }

  ngOnInit(): void {
    this.newUser = {
      photo: '',
      name: '',
      lat: 0,
      lng: 0,
      password:'',
      email:'',
    };
  }


  changeImage(fileInput: HTMLInputElement): void {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.newUser.photo = reader.result as string;
    });
  }




}
