import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { LocalService } from '../../../shared/services/local.service';
import { ToastService } from '../../../shared/services/toast-service.service';
import { SwalService } from '../../../shared/services/swal.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss',
})
export class OfferComponent {
  form!: FormGroup;
  isMobile: boolean = false;

  route: google.maps.DirectionsRoute | undefined;
  leg: google.maps.DirectionsLeg | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public serviceHttp: BaseResourceService<Array<any>>,
    public localService: LocalService,
    public toast: ToastService,
    public swal: SwalService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.form.get('date')?.setValue(new Date());
  }

  buildForm() {
    this.form = this.formBuilder.group({
      origin: [null, Validators.required],
      destination: [null, [Validators.required]],
      date: [null, [Validators.required]],
    });
  }

  texts(value: 'title' | 'button' | 'icon'): string {
    const passenger: { [key: string]: string } = {
      title: 'Solicite sua carona aqui',
      button: 'Solicitar',
      icon: 'arrow_upward',
    };

    const driver: { [key: string]: string } = {
      title: 'Crie sua carona aqui',
      button: 'Criar',
      icon: 'add',
    };

    if (this.localService.userIsDriver) return driver[value];
    else return passenger[value];
  }

  get resourceLift(): any {
    let body = {};

    if (this.localService.hasUser) {
      if (this.localService.userIsDriver) {
        body = {
          driver_id: this.localService.user.driver_id,
          start_location: JSON.stringify(this.form.value.origin),
          end_location: JSON.stringify(this.form.value.destination),
        };
      } else {
        body = {
          passenger_id: this.localService.user.passenger_id,
          pickup_location: JSON.stringify(this.form.value.origin),
          dropoff_location: JSON.stringify(this.form.value.destination),
        };
      }
    }

    return body;
  }

  getControl(campo: string) {
    return this.form.get(campo) as FormControl;
  }

  search() {
    this.serviceHttp
      .customAction('POST', 'lifts', { lift: this.resourceLift })
      .subscribe({
        next: (res) => {
          if (res) {
            this.router.navigate(['/lifts']);
            this.swal.showMessage('Carona criada com sucesso!', 'success');
          }
        },
        error: (err) => {
          this.swal.showMessage(
            'Ocorreu um erro ao tentar criar a carona',
            'error'
          );
          throw err;
        },
      });
  }

  // gets
  get createDisabled(): boolean {
    const origin = this.form.value.origin;
    const destination = this.form.value.destination;

    if (this.isValid(origin) && this.isValid(destination)) {
      return false;
    }

    return true;
  }

  isValid(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  createWaypoint(): FormGroup {
    return this.formBuilder.group({
      address: [null, Validators.required],
    });
  }
}
