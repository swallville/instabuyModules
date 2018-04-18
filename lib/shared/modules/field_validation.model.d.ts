import { AbstractControl, FormControl } from '@angular/forms';
export declare class FieldValidation {
    static MatchPassword(AC: AbstractControl): any;
    static ValidateCNPJ(control: FormControl): {
        ValidateCNPJ: boolean;
    };
    static isCNPJValid(cnpj: any): boolean;
    static ValidateCPF(control: FormControl): any;
    static ValidatePhone(control: FormControl): any;
}
