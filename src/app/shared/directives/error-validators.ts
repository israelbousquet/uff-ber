import { AfterViewChecked, Directive, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[errorValidators]',
})
export class ErrorValidatorsDirective implements AfterViewChecked {
  @Input()
  errorValidators!: FormControl;

  constructor(private element: ElementRef) {}

  ngAfterViewChecked() {
    // captura a tag mat-error
    const tag: HTMLElement = this.element.nativeElement;
    tag.innerHTML = `${this.getErrorMessage(this.errorValidators)}`;
  }

  getErrorMessage(control: FormControl) {
    if (control && control.invalid && control.errors) {
      if (control.hasError('invalidDate')) return 'Data inválida';
      else if (control.hasError('required')) return 'Dado obrigatório';
      else if (control.hasError('invalid')) return control.errors?.['message'];
      else if (control.hasError('email')) return 'Formato de e-mail inválido';
      else if (control.hasError('CPFinvalid')) return 'CPF inválido';
      else if (control.hasError('CNPJinvalid')) return 'CNPJ inválido';
      else if (control.hasError('mercosulPlate')) return 'Placa inválida';
      else if (control.hasError('minlength')) {
        let length = control.errors['minlength'].requiredLength;
        return `Deve ter no mínimo ${length} caracteres`;
      } else if (control.hasError('maxlength')) {
        let length = control.errors['maxlength'].requiredLength;
        return `Deve ter no máximo ${length} caracteres`;
      } else if (control.hasError('max')) {
        let length = control.errors['max'].max;
        return `O valor máximo deve ser ${length}`;
      } else return `Valor inválido`;
    } else return '';
  }
}
