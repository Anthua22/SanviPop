import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Photo } from '../interfaces/photo';
import { Product, ProductAdd } from '../interfaces/product';
import { PhotoProductResponse } from '../interfaces/responses/photo-response';
import { ProductResponse } from '../interfaces/responses/product-response';
import { ProductsResponse } from '../interfaces/responses/products-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getMyProducts():Observable<Product[]>{
    return this.http.get<ProductsResponse>('products/mine').pipe(
      map(resp=>resp.products)
    )
  }

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

  editProduct(product: ProductAdd): Observable<Product> {
    return this.http.put<ProductResponse>(`products/${product.id}`, {
      title: product.title,
      description: product.description,
      price: product.price,
      category: +product.category
    }).pipe(
      map(z => z.product)
    );

  }

  buyProduct(id:number):Observable<void>{
    return this.http.put<void>(`products/${id}/buy`,{}).pipe();
  }

  addProduct(product: ProductAdd): Observable<Product> {
    return this.http.post<ProductResponse>('products', product).pipe(
      map(resp => resp.product)
    );
  }

  deleteProduct(prodId: number): Observable<void> {
    return this.http.delete<void>(`products/${prodId}`);
  }

  getProductsMineSold(): Observable<Product[]>{
    return this.http.get<ProductsResponse>('products/mine/sold').pipe(map(x=>{
      return x.products
    }))
  }

  getBookMarked():Observable<Product[]>{
    return this.http.get<ProductsResponse>('products/bookmarks').pipe(map(x=>{
      return x.products
    }));
  }

  getMyProductsBought():Observable<Product[]>{
    return this.http.get<ProductsResponse>('products/mine/bought').pipe(map(x=>x.products));
  }

  addFavorite(id:number):Observable<void>{
    return this.http.post<void>(`products/${id}/bookmarks`,{}).pipe();
  }

  deleteFavorite(id:number):Observable<void>{
    return this.http.delete<void>(`products/${id}/bookmarks`).pipe();
  }

  addPhotoProduct(photo:string, id:number):Observable<Photo>{
    return this.http.post<PhotoProductResponse>(`products/${id}/photos`,{photo}).pipe(
      map(x=>x.photo)
    );
  }

  deletePhoto(photo:Photo, idProduct:number):Observable<void>{
    return this.http.delete<void>(`products/${idProduct}/photos/${photo.id}`)
  }

  updateMainPhoto(idProduct:number, idPhoto:number):Observable<Product>{
    return this.http.put<ProductResponse>(`products/${idProduct}`,{maintPhoto:idPhoto}).pipe(
      map(x=>x.product)
    );
  }
}
