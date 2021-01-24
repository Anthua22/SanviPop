import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
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

  password: string = '';
  passwordconfirm: string = '';
  @ViewChild('deleteSwal')
  public readonly deleteSwal!: SwalComponent;

  constructor(private route: ActivatedRoute) { }

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

  updateProfile():void{

  }


}
