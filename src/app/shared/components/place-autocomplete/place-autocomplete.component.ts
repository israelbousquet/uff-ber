import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

export interface PlaceSearchResult {
  address?: string;
  location?: google.maps.LatLng;
  name?: string;
}
@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrl: './place-autocomplete.component.scss',
})
export class PlaceAutocompleteComponent implements OnInit {
  @ViewChild('inputField')
  inputField!: ElementRef;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() control!: FormControl | AbstractControl;

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;
  currentStateAutoComplete: boolean = false;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  updateControl(event: KeyboardEvent) {
    if (event.key !== 'Tab') {
      const value = this.inputField.nativeElement.value;
      this.control.setValue(value);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.inputField.nativeElement
      );

      this.autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = this.autocomplete?.getPlace();

          const result: PlaceSearchResult = {
            address: this.inputField.nativeElement.value,
            name: place?.name,
            location: place?.geometry?.location,
          };

          this.control.setValue(result);
          this.currentStateAutoComplete = true;
          this.ngZone.run(() => {
            this.placeChanged.emit(result);
          });
        });
      });
    }, 1000);
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    if (place?.photos && place.photos.length > 0) {
      return place.photos[0].getUrl({ maxWidth: 500 });
    } else {
      return undefined;
    }
  }
}
