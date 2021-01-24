import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

import { User } from 'src/app/users/interfaces/user';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import * as moment from 'moment';
import { UserService } from 'src/app/users/services/user.service';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'sp-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @ViewChild('helloSwal') private helloSwal!: SwalComponent;

  name:string='';
  @Output() deleted = new EventEmitter<void>();
  owner!: User;

  constructor(private productsService: ProductsService,public readonly swalTargets: SwalPortalTargets) { }
  sayHello(name: string): void {
    this.name = name;
    this.helloSwal.fire();
  }

  goBack(){

  }
  ngOnInit(): void {

    this.product.datePublished = moment(this.product.datePublished).startOf('hour').fromNow();
    this.owner = this.product.owner!;

  }

  deleteProduct(): void {
    this.productsService.deleteProduct(this.product.id as number).subscribe(
      () => this.deleted.emit(),
      error => console.error(error)
    );

  }

}
