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
import Swal from 'sweetalert2';
import { SwalService } from '../../../shared/services/swal.service';

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

  driverEmpty: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public serviceHttp: BaseResourceService<Array<any>>,
    public localService: LocalService,
    public toast: ToastService,
    @Inject(MAT_DIALOG_DATA) private data: { lift: Lift },
    private dialogRef: MatDialogRef<OfferDialogComponent>,
    public swal: SwalService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.createWaypoints(this.data.lift)
    if (this.liftDetail.driver_id == null) {
      this.driverEmpty = true;
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      origin: [null, Validators.required],
      destination: [null, [Validators.required]],
    });
  }

  createWaypoints(res: Lift) {
    res.waypoints.forEach((waypoint) => {
      const pickupWaypoint = {
        stopover: true,
        location: waypoint.pickup_location.location,
      };

      const dropoffWaypoint = {
        stopover: true,
        location: waypoint.dropoff_location.location,
      };

      this.waypoints.push(pickupWaypoint);
      this.waypoints.push(dropoffWaypoint);
    });
  }

  add() {
    this.patchLift();
  }

  patchLift() {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja realmente participar da carona?',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceHttp
        .customAction('PATCH', `lifts/${this.liftDetail.id}`, {
          lift: this.resourceLift,
        })
        .subscribe({
          next: (res) => {
            if (res) {
              this.dialogRef.close(true);
            }
          },
          error: (err) => {
            this.swal.showMessage(
              'Ocorreu um erro ao tentar adicionar a carona atual.',
              'error'
            );
            throw err;
          },
        });
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  // gets
  getControl(campo: string) {
    return this.form.get(campo) as FormControl;
  }

  get liftDetail() {
    return this.data?.lift?.lift!;
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
