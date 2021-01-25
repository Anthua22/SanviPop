import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/products/interfaces/product';
import { ProductsService } from 'src/app/products/services/products.service';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'sp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!:User;
  active:number=1;
  productsFavorites!:Product[];
  myProducts!:Product[];
  productsBoughts!:Product[];
  public readonly nav!: NgbNav;
  constructor(private router:Router,private route: ActivatedRoute, private productService:ProductsService) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      x=>this.user = x.user
    );
    this.productService.getMyProducts().subscribe(x=>this.myProducts=x,
      err=>console.error(err));
    this.productService.getProductsMineSold().subscribe(x=>this.productsBoughts=x)

  }



}
