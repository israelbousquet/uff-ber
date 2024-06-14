import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { LocalService } from '../../../shared/services/local.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss'
})
export class OfferComponent {
  form!: FormGroup;
  isMobile: boolean = false;
  isLoading: boolean = false;

  route: google.maps.DirectionsRoute | undefined;
  leg: google.maps.DirectionsLeg | undefined;
  constructor(private formBuilder: FormBuilder, private router: Router, public serviceHttp: BaseResourceService<Array<any>>, public localService: LocalService) {
  }

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

  createWaypoint(): FormGroup {
    return this.formBuilder.group({
      address: [null, Validators.required]
    });
  }

  getControl(campo: string) {
    return this.form.get(campo) as FormControl;
  }

  search() {
    this.serviceHttp.customAction("POST", "lifts", { lift: this.resourceLift }).subscribe(res => {
      if (res) console.log(res)
    })
  }

  destinationChange(result: google.maps.DirectionsResult) {
    if (result) {
      this.route = result.routes[0];
      this.leg = this.route.legs[0];

      this.openGoogleMapsRoute();
    }
  }

  openGoogleMapsRoute() {
    const origin = this.form.value.origin.address;
    const destination = this.form.value.destination.address;

    const urlMaps = `https://www.google.com/maps/dir/?api=1&destination=${destination}&origin=${origin}&travelmode=driving`;
    window.open(urlMaps, '_blank')
  }

  get waypoints(): FormArray {
    return this.form.get('waypoints') as FormArray;
  }

  addWaypoint() {
    const control = this.formBuilder.control(null, Validators.required);
    this.waypoints.push(control);
  }

  removeWaypoint(index: number) {
    this.waypoints.removeAt(index);
  }
}
