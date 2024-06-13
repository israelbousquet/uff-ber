import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorValidatorsDirective } from './directives/error-validators';
import { PlaceAutocompleteComponent } from './components/place-autocomplete/place-autocomplete.component';
import { MapDisplayComponent } from './components/map-display/map-display.component';
import { GoogleMap, MapDirectionsRenderer, MapMarker } from '@angular/google-maps';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeRoutingModule } from '../domain/home/home-routing.module';

@NgModule({
  declarations: [
    ErrorValidatorsDirective,
    PlaceAutocompleteComponent,
    MapDisplayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HomeRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    GoogleMap,
    MapDirectionsRenderer,
    MapMarker
  ],
  exports: [
    ErrorValidatorsDirective,
    FormsModule,
    ReactiveFormsModule,
    PlaceAutocompleteComponent,
    MapDisplayComponent,
  ]
})
export class SharedModule { }
