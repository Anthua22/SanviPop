import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  UrlSegment
} from '@angular/router';
import { NEVER, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../products/interfaces/product';
import { ProductsService } from '../products/services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {
  constructor(private productsService: ProductsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> | Observable<never> {
    let urledit:UrlSegment = route.url[route.url.length-2];

      return this.productsService.getProduct(route.params.id).pipe(catchError(error => {
        this.router.navigate(['/products/add']);
        return NEVER;
      }))
    };


}
