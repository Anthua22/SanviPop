import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/guards/page-leave.guard';
import { Category } from '../interfaces/category';
import { Product, ProductAdd } from '../interfaces/product';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'sp-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, CanComponentDeactivate {
  @Output() add = new EventEmitter<Product>();
  newProduct!: ProductAdd;
  photoFile = '';
  emailconfirmation!:string;
  categories: Category[] = [];
  saved = false;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(
      categories => this.categories = categories
    );
    this.resetForm();
  }

  resetForm(): void {
    this.newProduct = {
      title: '',
      category: 0,
      description: '',
      mainPhoto: '',
      price: 0
    };
    this.photoFile = '';
  }

  addProduct(): void {
    this.newProduct.category = +this.newProduct.category;
    this.productsService.addProduct(this.newProduct).subscribe(
      product => {
        this.saved = true;
        this.router.navigate(['/products']);
      },
      error => console.error(error)
    );
  }

  changeImage(fileInput: HTMLInputElement): void {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.newProduct.mainPhoto = reader.result as string;
    });
  }

  canDeactivate(): boolean {
    return this.saved || confirm('Are you sure you want to leave this page?. Changes will be lost...');
  }

}
