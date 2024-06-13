import { BaseResourceService } from './../../../../shared/services/base-resource.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../../validators/customValidators';
import { ToastService } from '../../../../shared/services/toast-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  hide = true;

  resourceForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    public serviceHttp: BaseResourceService<Array<any>>,
    private toast: ToastService
  ) {
  }

  ngOnInit() {
    this.buildForm();
    // this.serviceHttp.customAction("GET", "lifts", null).subscribe(res => {
    //   if (res) console.log(res)
    // })
  }

  buildForm() {
    this.resourceForm = this.formBuilder.group({
      iduff: ["14999474700", [Validators.required, Validators.minLength(11), Validators.maxLength(11), CustomValidators.validaCpf]],
      password: ["Teste2000#", [Validators.required, Validators.minLength(8), CustomValidators.passwordValidator]]
    })
  }

  onSubmit() {
    this.router.navigate(['/lifts']);

    // this.serviceHttp.customAction("POST", "login", this.resourceForm.value).subscribe({
    //   next: res => {
    //     console.log(res);
    //     this.router.navigate(['/lista']);
    //   },
    //   error: err => {
    //     this.toast.showToastError("Login Inválido");
    //   },
    // })
  }

  returnControl(campo: string) {
    return this.resourceForm.get(campo) as FormControl;
  }
}
