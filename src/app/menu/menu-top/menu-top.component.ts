import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'sp-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {

  constructor(private authService:AuthService) { }
  login:boolean=false;
  ngOnInit(): void {
    this.authService.logingChange$.subscribe(x=>{
      this.login=x
    })
  }


}
