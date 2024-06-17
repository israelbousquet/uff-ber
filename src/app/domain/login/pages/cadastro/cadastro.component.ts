import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';
import { ToastService } from '../../../../shared/services/toast-service.service';
import { CustomValidators } from '../../../../validators/customValidators';
import { UserCreated } from '../../../../shared/interfaces/global-interfaces';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  hide = true;
  hasMotorista: boolean = false;

  resourceForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public serviceHttp: BaseResourceService<UserCreated>,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.resourceForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      iduff: [
        null,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          CustomValidators.validaCpf,
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.passwordValidator,
        ],
      ],
      driver: [false],
    });
  }

  onSubmit() {
    const body = { user: { ...this.resourceForm.value } };

    this.serviceHttp.customAction('POST', 'users', body).subscribe({
      next: (res: UserCreated) => {
        if (res) {
          this.router.navigate(['/auth/login']);
          this.toast.showToastSucess('Cadastro realizado com sucesso');
        }
      },
      error: (err) => {
        this.toast.showToastError('Login Inválido');
        throw err;
      },
    });
  }

  changeRole(event: any) {
    if (event.checked) {
      const newControl = this.formBuilder.control(null, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]);

      this.resourceForm.addControl('cnh', newControl);
      this.resourceForm.get('driver')?.setValue(true);
      this.hasMotorista = true;
    } else {
      this.resourceForm.removeControl('cnh');
      this.resourceForm.get('driver')?.setValue(false);
      this.hasMotorista = false;
    }
  }

  returnControl(campo: string) {
    return this.resourceForm.get(campo) as FormControl;
  }
}
