import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { User } from '../users/interfaces/user';


@Directive({
  selector: '[spMatchEmail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchEmailDirective, multi: true }]
})
export class MatchEmailDirective implements Validator {

  constructor() {

  }


  validate(group: FormGroup): ValidationErrors | null {

    if (group.get('email')?.value && group.get('emailconfirm')?.value && group.get('email')?.value !== group.get('emailconfirm')?.value) {
      return { matchValue: true };
    }


    return null;
  }



}
