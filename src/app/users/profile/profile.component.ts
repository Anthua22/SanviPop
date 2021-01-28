import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/products/interfaces/product';
import { ProductsService } from 'src/app/products/services/products.service';
import { User } from '../interfaces/user';

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
  productsBought!: Product[];

  constructor(private route: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      x => this.user = x.user
    );
    if (this.user.me) {
      this.productService.getMyProducts().subscribe(x => this.myProducts = x,
        err => console.error(err));
      this.productService.getProductsMineSold().subscribe(x => this.productsSolds = x, err=>console.error(err));
      this.productService.getBookMarked().subscribe(x => {
        this.productsFavorites = x;
        this.productsFavorites = this.productsFavorites.filter(x=>x.status!=3)
      }, err=>console.error(err));
      this.productService.getMyProductsBought().subscribe(x => this.productsBought = x, err=>console.error(err));
    } else {
      this.productService.getUserProducts(this.user.id!).subscribe(x => this.myProducts = x,
        err => console.error(err));
      this.productService.getUserProductsSold(this.user.id!).subscribe(x => this.productsSolds = x, err=>console.error(err));
      this.productService.getUserProductsBought(this.user.id!).subscribe(x => this.productsBought = x, err=>console.error(err));
    }
  }

  changeFavorite(element: HTMLElement): void {
    if (element.children[0].classList.contains('far')) {
      element.children[0].classList.remove('far');
      element.children[0].classList.add('fas');
    } else {
      element.children[0].classList.add('far');
      element.children[0].classList.remove('fas');
    }
  }

  deleteProduct(product: Product) {
    this.myProducts = this.myProducts.filter(p => p !== product);
  }

  changeMyFavorite(element: HTMLElement, product: Product): void {
    this.productsFavorites = this.productsFavorites.filter(x => product != x);
    if (element.children[0].classList.contains('far')) {
      element.children[0].classList.remove('far');
      element.children[0].classList.add('fas');
    } else {
      element.children[0].classList.add('far');
      element.children[0].classList.remove('fas');
    }

  }

  changeListFavorites(product: Product) {
    this.productsFavorites.filter(x => x != product);
  }
}
