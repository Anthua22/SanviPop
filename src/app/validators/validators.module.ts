import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositiveValueDirective } from './positive-value.directive';
import { MatchEmailDirective } from './match-email.directive';

@NgModule({
  declarations: [
    PositiveValueDirective,
    MatchEmailDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PositiveValueDirective
  ]
})
export class ValidatorsModule { }
