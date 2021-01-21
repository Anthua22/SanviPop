import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'sp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!:User;
  constructor(private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      x=>this.user = x.user
    );
  }

}
