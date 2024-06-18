import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';
import { Vehicle } from '../../../../shared/interfaces/global-interfaces';
import { LocalService } from '../../../../shared/services/local.service';
import { mercosulPlateValidator } from '../../../../validators/customValidators';
import { SwalService } from '../../../../shared/services/swal.service';
import { ToastService } from '../../../../shared/services/toast-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  form!: FormGroup;
  isMobile: boolean = false;

  veiculo!: Vehicle;
  isUpdate: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public serviceHttp: BaseResourceService<Vehicle>,
    public local: LocalService,
    public swal: SwalService,
    public toast: ToastService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.getVehicle();
  }

  getVehicle() {
    this.serviceHttp
      .customAction('POST', `vehicles/show_by_driver`, {
        vehicle: { driver_id: this.local.user.driver_id },
      })
      .subscribe({
        next: (res: Vehicle) => {
          if (res) {
            this.veiculo = res;
            this.form.patchValue(res);
            this.isUpdate = true;
          } else {
            this.isUpdate = false;
          }
        },
        error: (err) => {
          this.toast.showToastError(
            'Houve um problema ao carregar o veículo, tente novamente'
          );
        },
      });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      model: [null, Validators.required],
      license_plate: [null, [Validators.required]],
      capacity: [null, Validators.required],
      color: [null, Validators.required],
      kind: [null, Validators.required],
    });
  }

  onSubmit() {
    const { endpoint, method, body } = this.endpointVehicle;

    let texto = 'Deseja realmente cadastrar o veículo?';

    if (this.isUpdate) {
      texto = 'Deseja realmente atualizar o veículo';
    }

    Swal.fire({
      icon: 'warning',
      title: texto,
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceHttp
          .customAction(method, endpoint, body)
          .subscribe((res) => {
            if (res) {
              this.swal.showMessage('Veículo alterado com sucesso', 'success');
              this.getVehicle();
            }
          });
      }
    });
  }

  // delete() {
  //   Swal.fire({
  //     icon: 'warning',
  //     title: 'Deseja realmente deletar o veículo?',
  //     showCancelButton: true,
  //     confirmButtonText: 'Sim!',
  //     cancelButtonText: `Não`,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.serviceHttp
  //         .customAction('DELETE', `vehicles/${this.veiculo.id}`, null)
  //         .subscribe({
  //           next: (res) => {
  //             if (res) {
  //               this.swal.showMessage(
  //                 'Veículo alterado com sucesso',
  //                 'success'
  //               );
  //               this.getVehicle();
  //             }
  //           },
  //           error: (err) => {
  //             this.swal.showMessage(
  //               'Não foi possível deletar o registro',
  //               'error'
  //             );
  //           },
  //         });
  //     }
  //   });
  // }

  // getters

  get endpointVehicle(): { endpoint: string; method: string; body: any } {
    let endpoint = `vehicles`;
    let method = 'POST';

    if (this.isUpdate) {
      endpoint = `vehicles/${this.veiculo.id}`;
      method = 'PATCH';
    }

    const obj = {
      driver_id: this.local.user.driver_id,
      model: this.form.value.model,
      license_plate: this.form.value.license_plate,
      capacity: this.form.value.capacity,
      color: this.form.value.color,
      kind: this.kindTranslate(this.form.value.kind),
    };
    const body = { vehicle: obj };

    return { endpoint, method, body };
  }

  // helpers

  kindTranslate(kind: string) {
    const kinds: any = {
      motocycle: 0,
      car: 1,
      van: 2,
    };

    return kinds[kind];
  }

  returnControl(campo: string) {
    return this.form.get(campo) as FormControl;
  }
}
