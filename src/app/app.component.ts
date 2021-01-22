import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser as fasUser } from '@fortawesome/free-solid-svg-icons';
import {faGoogle } from '@fortawesome/free-brands-svg-icons';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faCoffee);
    library.addIcons(fasUser);
    library.addIcons(faGoogle);
  }

  ngOnInit(): void {
  }

}
