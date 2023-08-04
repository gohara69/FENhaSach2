import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function numberPositiveValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;
        return !(value > 0) ? {numberPositive:true}: null;
    }
}