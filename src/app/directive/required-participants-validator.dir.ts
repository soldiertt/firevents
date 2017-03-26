import {Directive, Input} from '@angular/core';
import {AbstractControl, FormControl, NG_VALIDATORS, ValidatorFn} from '@angular/forms';
import {Participant} from '../class/participant.class';

function validateParticipantFactory(participants: Participant[]): ValidatorFn {
  return (c: AbstractControl) => {
    if (participants) {
      const isValid = participants.length > 0;

      if (isValid) {
        return null;
      } else {
        return { participant: { valid: false } };
      }
    }
  };
}

@Directive({
  selector: '[appRequiredParticipants][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: RequiredParticipantsValidatorDirective, multi: true }
  ]
})
export class RequiredParticipantsValidatorDirective {
  validator: ValidatorFn;
  @Input('appRequiredParticipants') participants: Participant[];

  constructor() {}

  validate(c: FormControl) {
    this.validator = validateParticipantFactory(this.participants);
    return this.validator(c);
  }
}
