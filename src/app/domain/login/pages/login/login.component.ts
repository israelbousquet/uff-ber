import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../../validators/customValidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  hide = true;

  resourceForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.resourceForm = this.formBuilder.group({
      userName: ['usuariopadrao', Validators.required],
      email: ['israelbousquet@gmail.com', [Validators.required, Validators.email]],
      password: ['Cael20184613#', [Validators.required, Validators.minLength(8), CustomValidators.passwordValidator]]
    })
  }

  onSubmit() {
    this.router.navigate(['/home']);
    this.resourceForm.reset();
  }

  returnControl(campo: string) {
    return this.resourceForm.get(campo) as FormControl;
  }
}
