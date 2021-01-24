import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'sp-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  user!: User;
  photoFile: string = '';
  message!: string;
  password: string = '';
  passwordconfirm: string = '';
  title: string = '';
  @ViewChild('updateProfileSwal')
  public readonly componentSwal!: SwalComponent;
  @ViewChild('errorSwal')
  public readonly errorSwal!: SwalComponent;

  constructor(private route: ActivatedRoute, private userService: UserService, public readonly swalTargets: SwalPortalTargets) { }

  ngOnInit(): void {
    this.route.data.subscribe(x => this.user = x.user);
  }

  changeImage(fileInput: HTMLInputElement, imgPreview: HTMLImageElement): void {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      imgPreview.src = reader.result as string;
      imgPreview.classList.remove('d-none');
    });
  }

  updateProfile(): void {
    this.userService.updateProfile(this.user.name!, this.user.email).subscribe(
      x => {
        this.title = "Profile Update";
        this.message = "Name or email change successfull"
        this.componentSwal.fire();
      },
      err => {
        this.title = "Error Update Profile";
        this.message = err;
        this.errorSwal.fire();
      }
    )
  }

  updatePhoto(imgPreview: HTMLImageElement): void {
    this.user.photo = imgPreview.src;
    this.userService.updateAvatar(this.user.photo!).subscribe(
      x => {
        imgPreview.classList.add('d-none');
        this.user.photo = x;
        this.photoFile = '';
        this.title = 'Photo Update';
        this.message = 'Profile picture has been successfully changed';
        this.componentSwal.fire();
      },
      err => {
        this.title = "Error Update Photo";
        this.message = err;
        this.errorSwal.fire();
      }
    )
  }

  updatePassword(): void {

    if (this.password === this.passwordconfirm && this.password.length > 0) {
      this.userService.updatePassword(this.password).subscribe(
        x => {
          this.message = 'The password has changed update successfull';
          this.title = 'Password Update';
          this.password='';
          this.passwordconfirm='';
          this.componentSwal.fire();
        },
        err => {
          this.title = "Error Update Password";
          this.message = err;
          this.errorSwal.fire();
        }
      )
    } else {
      this.title = "Error Password";
      this.message = "The passwords doen't match or don't be empty";
      this.errorSwal.fire();
    }
  }

}
