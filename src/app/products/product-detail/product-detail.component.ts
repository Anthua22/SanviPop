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
  title:string='';
  message:string='';
  @ViewChild('errorSwal')
  public readonly errorSwal!: SwalComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public readonly swalTargets:SwalPortalTargets
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

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
