import { Component, OnInit } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/guards/page-leave.guard';

@Component({
  selector: 'sp-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, CanComponentDeactivate {

  saved = false;
  constructor() { }
  canDeactivate(): boolean {
    return this.saved || confirm('Are you sure you want to leave this page?. Changes will be lost...');

  }

  ngOnInit(): void {
  }

}
