import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductAdd } from '../interfaces/product';
import { ProductResponse } from '../interfaces/responses/product-response';
import { ProductsResponse } from '../interfaces/responses/products-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductsResponse>('products').pipe(
      map(resp => resp.products)
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<ProductResponse>(`products/${id}`).pipe(
      map(resp => resp.product)
    );
  }

  addProduct(product: ProductAdd): Observable<Product> {
    return this.http.post<ProductResponse>('products', product).pipe(
      map(resp => resp.product)
    );
  }

  deleteProduct(prodId: number): Observable<void> {
    return this.http.delete<void>(`products/${prodId}`);
  }
}
