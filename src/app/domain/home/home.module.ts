import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PlaceAutocompleteComponent } from './components/place-autocomplete/place-autocomplete.component';
import { HomeComponent } from './pages/home/home.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MapDisplayComponent } from './components/map-display/map-display.component';
import { GoogleMap } from '@angular/google-maps';
import { MapDirectionsRenderer } from '@angular/google-maps';
import { MapMarker } from '@angular/google-maps';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HomeComponent,
    PlaceAutocompleteComponent,
    MapDisplayComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMap,
    MapDirectionsRenderer,
    MapMarker,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class HomeModule { }
