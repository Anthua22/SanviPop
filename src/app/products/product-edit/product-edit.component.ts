import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/guards/page-leave.guard';
import { Category } from '../interfaces/category';
import { Product, ProductAdd } from '../interfaces/product';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'sp-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, CanComponentDeactivate {

  saved = false;
  product!:Product;
  productSend!:ProductAdd;
  photoFile!:string;
  categories: Category[] = [];

  constructor(private route: ActivatedRoute  , private categoriesService: CategoriesService,private productService:ProductsService) { }
  canDeactivate(): boolean {
    return this.saved || confirm('Are you sure you want to leave this page?. Changes will be lost...');

  }

  ngOnInit(): void {
    this.route.data.subscribe(
      x=>{this.product= x.product
      console.log(this.product)}
    )
    this.categoriesService.getCategories().subscribe(
      categories => this.categories = categories
    );
  }

  editProduct(){
    this.productSend.title = this.product.title;
    this.productSend.price = this.product.price;
    this.productSend.description = this.product.description;
    this.productSend.category = this.product.category.id;

    this.productService.editProduct(this.productSend);
  }

}
