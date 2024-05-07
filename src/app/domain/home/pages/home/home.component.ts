import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PlaceSearchResult } from '../../components/place-autocomplete/place-autocomplete.component';

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
  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
    this.form.get('date')?.setValue(new Date());
  }

  buildForm() {
    this.form = this.formBuilder.group({
      origin: [null, Validators.required],
      destiny: [null, [Validators.required]],
      waypoint: [null, Validators.required],
      date: [null, [Validators.required]]
    })
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
      console.log(this.route)
    }
  }
}
