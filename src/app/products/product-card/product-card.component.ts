import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/users/interfaces/user';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'sp-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() deleted = new EventEmitter<void>();
  @Input() owner!:User;

  constructor(private productsService: ProductsService, private authService:AuthService) { }

  ngOnInit(): void {
  //  this.authService.
  }

  deleteProduct(): void {
    this.productsService.deleteProduct(this.product.id as number).subscribe(
      () => this.deleted.emit(),
      error => console.error(error)
    );

  }

}
