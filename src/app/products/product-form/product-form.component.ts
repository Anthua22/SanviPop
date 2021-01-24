import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  productRecive!: Product;
  photoFile = '';
  emailconfirmation!: string;
  categories: Category[] = [];
  saved = false;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.resetForm();
    this.route.data.subscribe(
      x => {
        this.productRecive = x.product;
        this.getData(this.productRecive)

      }
    )
    this.categoriesService.getCategories().subscribe(
      categories => this.categories = categories
    );
  }

  getData(otherProduct: Product) {
    if (otherProduct) {
      this.newProduct.id =otherProduct.id;
      this.newProduct.title = otherProduct.title;
      this.newProduct.category = otherProduct.category.id;
      this.newProduct.description = otherProduct.description;
      this.newProduct.price = otherProduct.price;

    }

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
    if (this.productRecive) {
      this.productsService.editProduct(this.newProduct).subscribe(x => {
        this.saved = true;
        this.router.navigate(['/products']);
      },
      err=>{
        console.error(err)
      });
    } else {
      this.newProduct.category = +this.newProduct.category;
      this.productsService.addProduct(this.newProduct).subscribe(
        product => {
          this.saved = true;
          this.router.navigate(['/products']);
        },
        error => console.error(error)
      );
    }

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
    console.log('der');
    return this.saved || confirm('Are you sure you want to leave this page?. Changes will be lost...');
  }

}
