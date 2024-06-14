import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { LocalService } from '../../../shared/services/local.service';
import { ToastService } from '../../../shared/services/toast-service.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss'
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
    public toast: ToastService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.form.get('date')?.setValue(new Date());
  }

  buildForm() { 
    this.form = this.formBuilder.group({
      origin: [null, Validators.required],
      destination: [null, [Validators.required]],
      date: [null, [Validators.required]]
    })
  }

  get resourceLift(): any {
    let body = {};

    if (this.localService.hasUser ) {
      if (this.localService.userIsDriver) {
        body = {
          driver_id: this.localService.user.driver_id,
          start_location: JSON.stringify(this.form.value.origin),
          end_location: JSON.stringify(this.form.value.destination),
        }
      } else {
        body = {
          passenger_id: this.localService.user.passenger_id,
          pickup_location: JSON.stringify(this.form.value.origin),
          dropoff_location: JSON.stringify(this.form.value.destination)
        }
      }
    }

    return body;
  }

  getControl(campo: string) {
    return this.form.get(campo) as FormControl;
  }

  search() {
    this.serviceHttp.customAction("POST", "lifts", { lift: this.resourceLift }).subscribe({
      next: res => {
        if (res) {
          this.router.navigate(['/lifts'])
          this.toast.showToastSucess('Carona criada com sucesso!');
        }
      },
      error: err => {
        this.toast.showToastError('Ocorreu um erro ao tentar criar a carona.');
        throw(err);
      }
    })
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
      address: [null, Validators.required]
    });
  }
}
