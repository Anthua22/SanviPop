import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CanComponentDeactivate } from 'src/app/guards/page-leave.guard';
import { SweetAlertResult } from 'sweetalert2';
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
  @ViewChild('errorSwal')
  public readonly errorSwal!: SwalComponent;
  newProduct!: ProductAdd;
  productRecive!: Product;
  photoFile = '';
  message: string = '';
  emailconfirmation!: string;
  categories: Category[] = [];
  saved = false;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    public readonly swalTargets: SwalPortalTargets
  ) { }

  ngOnInit(): void {
    this.resetForm();
    this.route.data.subscribe(
      x => {
        let product: Product = x.product;
        if (product.mine) {
          this.productRecive = product;
          this.getData(this.productRecive)
        }else{
          this.router.navigate(['/products/add']);
        }



      },
      err => {
        this.message = err;
        this.errorSwal.fire();
      }
    )
    this.categoriesService.getCategories().subscribe(
      categories => this.categories = categories,
      err => {
        this.message = err;
        this.errorSwal.fire();
      }
    );
  }

  private getData(otherProduct: Product) {
    if (otherProduct) {
      this.newProduct.id = otherProduct.id;
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

  operationProduct(): void {
    if (this.productRecive) {
      this.productsService.editProduct(this.newProduct).subscribe(x => {
        this.saved = true;
        this.router.navigate(['/products']);
      },
        err => {
          this.message = err;
          this.errorSwal.fire();
        });
    } else {
      this.newProduct.category = +this.newProduct.category;
      this.productsService.addProduct(this.newProduct).subscribe(
        product => {
          this.saved = true;
          this.router.navigate(['/products']);
        },
        err => {
          this.message = err;
          this.errorSwal.fire();
        }
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

  async canDeactivate(): Promise<boolean> {
    return this.saved || await (await this.errorSwal.fire()).isConfirmed;

  }

}
