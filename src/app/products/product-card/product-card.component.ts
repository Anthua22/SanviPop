import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

import { User } from 'src/app/users/interfaces/user';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import * as moment from 'moment';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'sp-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  payedMessage = '';
  idbutton!: string;

  productsFavorite!: Product[];

  name: string = '';
  @Output() deleted = new EventEmitter<void>();
  @Output() favorite = new EventEmitter<HTMLElement>();


  owner!: User;

  constructor(private productsService: ProductsService, public readonly swalTargets: SwalPortalTargets) { }


  ngOnInit(): void {

    this.product.datePublished = moment(this.product.datePublished).startOf('hour').fromNow();
    this.owner = this.product.owner!;
    this.idbutton = this.product.title + this.product.id;
    this.productsService.getBookMarked().subscribe(
      x => {
        this.productsFavorite = x;
        this.productsFavorite.forEach(x => {
          if (x.id === this.product.id) {
            this.product.favorite = true;

          }
        })
      }
    )

  }

  deleteProduct(): void {
    this.productsService.deleteProduct(this.product.id as number).subscribe(
      () => this.deleted.emit(),
      error => console.error(error)
    );

  }

  changeFavorite(element: HTMLElement): void {

    if (element.children[0].classList.contains('far')) {
      this.productsService.addFavorite(this.product.id as number).subscribe(
        () => {
          this.favorite.emit(element);

        },
        err => console.error(err)
      )
    } else {
      this.productsService.deleteFavorite(this.product.id!).subscribe(
        () => {
          this.favorite.emit(element)
        },
        err => console.error(err)
      )
    }

  }


}
