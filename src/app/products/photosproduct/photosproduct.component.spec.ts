import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosproductComponent } from './photosproduct.component';

describe('PhotosproductComponent', () => {
  let component: PhotosproductComponent;
  let fixture: ComponentFixture<PhotosproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
