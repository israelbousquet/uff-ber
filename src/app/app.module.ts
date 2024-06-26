import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHotToastConfig } from '@ngneat/hot-toast';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentComponent } from './layouts/content/content/content.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ContentComponent],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatMenuModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHotToastConfig({
      stacking: 'depth',
      visibleToasts: 1,
    }),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
