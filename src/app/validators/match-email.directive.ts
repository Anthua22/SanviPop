import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { User } from '../users/interfaces/user';

@Directive({
  selector: '[spMatchEmail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchEmailDirective, multi: true }]
})
export class MatchEmailDirective implements Validator {



  user!: User;
  constructor() {

  }

  validate(othercontrol: AbstractControl): ValidationErrors | null {
    if (othercontrol) {
      return (control: AbstractControl) => {
        othercontrol.value === control.value ? { matchEmail: true } : null
      };
    }

    return null;
  }



}
