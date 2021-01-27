import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../interfaces/photo';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'sp-photosproduct',
  templateUrl: './photosproduct.component.html',
  styleUrls: ['./photosproduct.component.css']
})
export class PhotosproductComponent implements OnInit {

  photo!: string;
  product!:Product;
  photoFile: string = '';

  constructor(private route: ActivatedRoute, private productsService:ProductsService) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {this.product = data.product
        console.log(this.product.photos)
        console.log(this.product.id)

        console.log(this.product.mainPhoto)},

      err => {
       console.log(err)
      }
    );
  }

  addPhoto(): void {
    this.productsService.addPhotoProduct(this.photo,this.product.id!).subscribe(
      x=>{

        this.product.photos!.push(x);
        this.photo = '';
        this.photoFile='';
      }
    )
  }

  updateMainPhoto(photo:Photo):void{
    this.productsService.updateMainPhoto(this.product.id!,photo.id).subscribe(
      x=>{
        console.log(x)
        this.product.mainPhoto = x.mainPhoto
      }
    );
  }

  changeImage(fileInput: HTMLInputElement): void {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.photo = reader.result as string;
    });
  }

  deletePhoto(photo:Photo):void
  {
    this.productsService.deletePhoto(photo, this.product.id!).subscribe(x=>{
      this.product.photos = this.product.photos?.filter(x=>x!=photo);
    })
  }
}
