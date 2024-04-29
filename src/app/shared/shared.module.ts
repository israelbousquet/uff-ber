import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorValidatorsDirective } from './directives/error-validators';

@NgModule({
  declarations: [
    ErrorValidatorsDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ErrorValidatorsDirective,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
