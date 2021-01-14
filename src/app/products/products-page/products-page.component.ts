import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'sp-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];
  search = '';

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
      products => this.products = products
    );
  }

  addProduct(product: Product): void {
    // Creating a new array instead of using .push, re-executes the filter pipe
    this.products = [...this.products, product];
  }

  deleteProduct(product: Product): void {
    // Creating a new array with filter instead of using .splice, re-executes the filter pipe
    this.products = this.products.filter(p => p !== product);
  }
}
