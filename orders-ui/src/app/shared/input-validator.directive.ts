import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function inputValidator(input: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const valid: boolean = parseInt(input) !== -1 ? true : false;
        return !valid ? { 'invalidSelection': {value: control.value} } : null;
    }
}

@Directive({
    selector: '[orderSelection]',
    providers: [{provide: NG_VALIDATORS, useExisting: InputValidatorDirective, multi: true}]
})

export class InputValidatorDirective implements Validator {
    validate(control: AbstractControl): {[key:string]: any} {
        return control.value ? inputValidator(control.value)(control) : null;
    }
}