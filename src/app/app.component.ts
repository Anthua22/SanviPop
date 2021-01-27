import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser as fasUser } from '@fortawesome/free-solid-svg-icons';


import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimation', [
      transition('productList => productDetail', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%' })),
        query(':enter', style({ transform: 'translateX(100%)' })),
        group([
          query(':leave', [
            animate('0.5s', style({ transform: 'translateX(-100%)' })),
          ]),
          query(':enter', [
            animate('0.5s', style({ transform: 'none' })),
          ]),
        ])
      ]),
      transition('productDetail => productList', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%' })),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        group([
          query(':leave', [
            animate('0.5s', style({ transform: 'translateX(100%)' })),
          ]),
          query(':enter', [
            animate('0.5s', style({ transform: 'none' })),
          ]),
        ])
      ]),
      transition('userProfile => userEditProfile',[
        query(':enter, :leave', style({ position: 'absolute',  width:'100%' })),
        query(':enter', style({ transform: 'translateY(100%)' })),
        group([
          query(':leave', [
            animate('0.5s', style({ transform: 'translateY(-100%)' })),
          ]),
          query(':enter', [
            animate('0.5s', style({ transform: 'none' })),
          ]),
        ])
      ]),
      transition('userEditProfile => userProfile',[
        query(':enter, :leave', style({ position: 'absolute', width:'100%' })),
        query(':enter', style({ transform: 'translateY(-100%)' })),
        group([
          query(':leave', [
            animate('0.5s', style({ transform: 'translateY(100%)' })),
          ]),
          query(':enter', [
            animate('0.5s', style({ transform: 'none' })),
          ]),
        ])
      ]),
      transition('productList => productEdit',[
        query(':enter, :leave', style({ position: 'absolute', width: '100%' })),
        query(':enter', style({ transform: 'translateX(100%)' })),
        group([
          query(':leave', [
            animate('0.5s', style({ transform: 'translateX(-100%)' })),
          ]),
          query(':enter', [
            animate('0.5s', style({ transform: 'none' })),
          ]),
        ])
      ]),
      transition('productEdit => productList', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%' })),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        group([
          query(':leave', [
            animate('0.5s', style({ transform: 'translateX(100%)' })),
          ]),
          query(':enter', [
            animate('0.5s', style({ transform: 'none' })),
          ]),
        ])
      ]),
      transition('productEdit => productPhotos',[
        query(':enter, :leave', style({ position: 'absolute',  width:'100%' })),
        query(':enter', style({ transform: 'translateY(100%)' })),
        group([
          query(':leave', [
            animate('0.5s', style({ transform: 'translateY(-100%)' })),
          ]),
          query(':enter', [
            animate('0.5s', style({ transform: 'none' })),
          ]),
        ])
      ])

    ])
  ]
})
export class AppComponent implements OnInit {

  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faCoffee);
    library.addIcons(fasUser);

  }
  getState(outlet: RouterOutlet) {
    // Returns the page animation name (or 'None' of it has no animation)
    return outlet.activatedRouteData.animation || 'None';
  }

  ngOnInit(): void {
  }

}
