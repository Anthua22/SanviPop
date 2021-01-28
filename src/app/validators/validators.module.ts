import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositiveValueDirective } from './positive-value.directive';


@NgModule({
  declarations: [
    PositiveValueDirective,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    PositiveValueDirective,
  ]
})
export class ValidatorsModule { }
