import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'sp-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  title: string = '';
  message: string = '';
  @ViewChild('errorSwal')
  public readonly errorSwal!: SwalComponent;
  @ViewChild('buySwal')
  private buySwal!: SwalComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public readonly swalTargets: SwalPortalTargets,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => this.product = data.product,
      err => {
        this.title = "Error getting the product";
        this.message = err;
        this.errorSwal.fire();
      }
    );


  }


  getPayment(ok: boolean) {
    if (ok) {
      this.productsService.buyProduct(this.product.id!).subscribe(
        x => {
          this.buySwal.fire();
        },
        err => {
          this.buySwal.title = "Error"
          this.buySwal.icon = "error"
          this.buySwal.text = "Error buying the product"
          this.buySwal.fire();
        }
      );
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

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
