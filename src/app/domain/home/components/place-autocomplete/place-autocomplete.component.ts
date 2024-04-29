import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrl: './place-autocomplete.component.scss'
})
export class PlaceAutocompleteComponent implements OnInit {
  @ViewChild('inputField')
  inputField!: ElementRef;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() control!: FormControl;

  autocomplete: google.maps.places.Autocomplete | undefined;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);

      this.autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = this.autocomplete?.getPlace();
          this.control.setValue(place)
          console.log(place)
        })
      })
    }, 1000)

  }
}
