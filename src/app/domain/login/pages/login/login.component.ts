import { BaseResourceService } from './../../../../shared/services/base-resource.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../../validators/customValidators';
import { ToastService } from '../../../../shared/services/toast-service.service';
import { UserCreated } from '../../../../shared/interfaces/global-interfaces';
import { LocalService } from '../../../../shared/services/local.service';

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
    public router: Router, 
    public serviceHttp: BaseResourceService<UserCreated>,
    private toast: ToastService,
    public localService: LocalService
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
      password: ["Teste2000#", [Validators.required, Validators.minLength(8), CustomValidators.passwordValidator]],
      driver: [false]
    })
  }

  onSubmit() {
    const body = { login: { ...this.resourceForm.value }};

    this.serviceHttp.customAction("POST", "logins", body).subscribe({
      next: (res: UserCreated) => {
        if (res) {
          this.router.navigate(['/lifts']);
          this.toast.showWelcome('Seja bem-vindo!')
          this.localService.set("user", res);
        }
      },
      error: err => {
        this.toast.showToastError("Login Inválido, tente novamente.");
      },
    })
  }

  changeRole(event: any) {
    if (event.checked) {
      this.resourceForm.get("driver")?.setValue(true);
    } else {
      this.resourceForm.get("driver")?.setValue(false);
    }
  }

  returnControl(campo: string) {
    return this.resourceForm.get(campo) as FormControl;
  }
}
