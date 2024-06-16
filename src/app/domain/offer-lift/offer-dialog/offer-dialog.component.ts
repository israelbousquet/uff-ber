import { Component, Inject } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lift, LiftDetail } from '../../../shared/interfaces/global-interfaces';
import { convertToLatLng } from '../../../shared/helpers/filter-location.helper';

@Component({
  selector: 'app-offer-dialog',
  templateUrl: './offer-dialog.component.html',
  styleUrl: './offer-dialog.component.scss',
})
export class OfferDialogComponent {
  form!: FormGroup;
  isMobile: boolean = false;

  route: google.maps.DirectionsRoute | undefined;
  leg: google.maps.DirectionsLeg | undefined;

  waypoints: google.maps.DirectionsWaypoint[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public serviceHttp: BaseResourceService<Array<any>>,
    public localService: LocalService,
    public toast: ToastService,
    @Inject(MAT_DIALOG_DATA) private data: { liftDetail: LiftDetail },
    private dialogRef: MatDialogRef<OfferDialogComponent>
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.buildForm();
    this.filterWaypoints();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      origin: [null, Validators.required],
      destination: [null, [Validators.required]],
    });
  }

  filterWaypoints() {
    this.form.valueChanges.subscribe((value) => {
      const origin = value.origin;
      const destination = value.destination;

      if (this.isValid(origin) && this.isValid(destination)) {
        this.waypoints = [
          {
            stopover: true,
            location: origin.location,
          },
          {
            stopover: true,
            location: destination.location,
          },
        ];
      }
    });
  }

  add() {
    this.patchLift();
  }

  patchLift() {
    this.serviceHttp
      .customAction('PATCH', `lifts/${this.lift.id}`, {
        lift: this.resourceLift,
      })
      .subscribe({
        next: (res) => {
          if (res) {
            this.dialogRef.close(true);
            this.toast.showToastSucess(
              'Pontos adicionados na carona com sucesso!'
            );
          }
        },
        error: (err) => {
          this.toast.showToastError(
            'Ocorreu um erro ao tentar adicionar a carona atual.'
          );
          throw err;
        },
      });
  }

  close() {
    this.dialogRef.close(false);
  }

  // gets
  getControl(campo: string) {
    return this.form.get(campo) as FormControl;
  }

  get lift() {
    return this.data.liftDetail;
  }

  get filteredWaypoints(): Array<any> {
    return this.waypoints.filter((item: any) => item && item.location);
  }

  getLocation(campo: string) {
    return this.form.get(campo)?.value?.location;
  }

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
}
