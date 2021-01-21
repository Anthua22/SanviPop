import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

import { User } from 'src/app/users/interfaces/user';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import * as moment from 'moment';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'sp-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() deleted = new EventEmitter<void>();
  owner!:User;

  constructor(private productsService: ProductsService, private userService:UserService) { }

  ngOnInit(): void {

    this.product.datePublished =  moment(this.product.datePublished).startOf('hour').fromNow();
    this.userService.getProfile(this.product.owner?.id).subscribe(x=>{
      this.owner = x
      console.log(this.owner)
    })
  }

  deleteProduct(): void {
    this.productsService.deleteProduct(this.product.id as number).subscribe(
      () => this.deleted.emit(),
      error => console.error(error)
    );

  }

}
