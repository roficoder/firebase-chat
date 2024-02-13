import {
  ContentChildren,
  Directive,
  ElementRef,
  HostListener,
  QueryList,
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Directive({
  selector: '[autoFocus]',
})
export class AutoFocusDirective {
  // @ContentChildren(NgModel, { descendants: true, read: ElementRef })
  // inputFields: QueryList<ElementRef>;

  // @ContentChildren(NgModel, { descendants: true }) ngModels: QueryList<any>;

  constructor(private ngForm: NgForm, private el: ElementRef) {}

  @HostListener('ngSubmit') onSubmit() {
    if (this.ngForm.valid) return;
    // console.log(this.ngForm);

    this.ngForm.control.markAllAsTouched();

    // const invalidFields = this.inputFields.filter((field: any) => {
    //   return (field.nativeElement as HTMLElement).classList.contains(
    //     'ng-invalid'
    //   );
    // });

    // invalidFields[0].nativeElement.focus();

    // for (let i = 0; i < this.ngModels.length; i++) {
    //   if (this.ngModels.get(i).control.errors) {
    //     this.inputFields.get(i)?.nativeElement.focus();
    //   }
    // }
    const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');

    if (invalidControl) {
      invalidControl.focus();
    }
  }
}
