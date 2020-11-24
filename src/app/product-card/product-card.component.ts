import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'sp-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() deleted = new EventEmitter<void>();
  readonly categories = ['Electronics', 'Motor and vehicles', 'Sports and hobbies', 'Other'];

  constructor() { }

  ngOnInit(): void {
  }

  deleteProduct(): void {
    this.deleted.emit();
  }

}
