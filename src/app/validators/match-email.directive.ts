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


  validate(group: FormGroup): { [key: string]: any } | null {
    if (group instanceof FormGroup) {
      if (Object.values(group.value) && group.value.email !== group.value.email2) {
        return { matchValue: true };
      }
    }

    return null;
  }



}
