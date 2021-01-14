import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[spPositiveValue]',
  providers: [{provide: NG_VALIDATORS, useExisting: PositiveValueDirective, multi: true}]
})
export class PositiveValueDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const numValue = +control.value;
    if(control.value !== null && !isNaN(numValue) && numValue <= 0) {
      return { positiveValue: true };
    }

    return null;
  }

}
