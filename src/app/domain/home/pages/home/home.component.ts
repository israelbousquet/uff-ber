import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { PlaceSearchResult } from '../../components/place-autocomplete/place-autocomplete.component';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  form!: FormGroup;
  isMobile: boolean = false;
  isLoading: boolean = false;

  route: google.maps.DirectionsRoute | undefined;
  leg: google.maps.DirectionsLeg | undefined;
  constructor(private formBuilder: FormBuilder, private router: Router, public serviceHttp: BaseResourceService<Array<any>>) {
  }

  ngOnInit() {
    this.buildForm();
    this.form.get('date')?.setValue(new Date());
    this.serviceHttp.customAction("GET", "comments", null).subscribe(res => {
      if (res) console.log(res)
    })
  }

  buildForm() { 
    this.form = this.formBuilder.group({
      origin: [null, Validators.required],
      destination: [null, [Validators.required]],
      waypoints: this.formBuilder.array([]),
      date: [null, [Validators.required]]
    })
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
    console.log(this.form.value)
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
