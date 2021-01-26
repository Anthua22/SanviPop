import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
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
  user!: User;
  active: number = 1;
  productsFavorites!: Product[];
  myProducts!: Product[];
  productsSolds!: Product[];
  public readonly nav!: NgbNav;
  constructor(private route: ActivatedRoute, private ngZone: NgZone, private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      x => this.user = x.user
    );
    this.productService.getMyProducts().subscribe(x => this.myProducts = x,
      err => console.error(err));
    this.productService.getProductsMineSold().subscribe(x => this.productsSolds = x);
    this.productService.getBookMarked().subscribe(x=>this.productsFavorites=x);

  }

  deleteProduct(product: Product) {
    console.log(product)
    this.myProducts = this.myProducts.filter(p => p !== product);
  }
  changeFavorite(element: HTMLElement, product:Product): void {
    this.productsFavorites = this.productsFavorites.filter(x=>product!=x);
    if (element.children[0].classList.contains('far')) {
      element.children[0].classList.remove('far');
      element.children[0].classList.add('fas');
    }else{
      element.children[0].classList.add('far');
      element.children[0].classList.remove('fas');
    }

  }

  changeListFavorites(product:Product){
    this.productsFavorites.filter(x=>x!=product);
  }
}
