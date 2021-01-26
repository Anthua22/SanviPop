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
  @Input() star!:HTMLElement;
  payedMessage = '';
  idbutton!:string;

  @ViewChild('buySwal') private buySwal!: SwalComponent;

  name: string = '';
  @Output() deleted = new EventEmitter<void>();
  @Output() favorite = new EventEmitter<HTMLElement>();
  owner!: User;

  constructor(private productsService: ProductsService, public readonly swalTargets: SwalPortalTargets) { }

  getPayment(ok: boolean) {
    if(ok){
      this.productsService.buyProduct(this.product.id!).subscribe(
          x=>{
            this.buySwal.fire();
          },
          err=>{
            this.buySwal.title = "Error"
            this.buySwal.icon = "error"
            this.buySwal.text = "Error buying the product"
            this.buySwal.fire();
          }
      );
    }

  }

  ngOnInit(): void {

    this.product.datePublished = moment(this.product.datePublished).startOf('hour').fromNow();
    this.owner = this.product.owner!;
    this.idbutton =  this.product.title+this.product.id;

  }

  deleteProduct(): void {
    this.productsService.deleteProduct(this.product.id as number).subscribe(
      () => this.deleted.emit(),
      error => console.error(error)
    );

  }

  addFavorite(element:HTMLElement):void{
    this.productsService.addFavorite(this.product.id as number).subscribe(
      ()=>this.favorite.emit(element),
      err=>console.error(err)
    )
  }


}
