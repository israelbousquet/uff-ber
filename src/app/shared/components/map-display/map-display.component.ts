import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PlaceSearchResult } from '../place-autocomplete/place-autocomplete.component';
import { GoogleMap, MapDirectionsService } from '@angular/google-maps';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrl: './map-display.component.scss',
})
export class MapDisplayComponent implements OnInit {
  @ViewChild('map', { static: true })
  map!: GoogleMap;

  @Input() from: PlaceSearchResult | undefined;
  @Input() to: PlaceSearchResult | undefined;
  @Input() waypointsInput: PlaceSearchResult[] | undefined;

  @Output() loading = new EventEmitter<boolean>(false);

  zoom: number = 10;
  center!: google.maps.LatLngLiteral | google.maps.LatLng;

  directionsResult$ = new BehaviorSubject<
    google.maps.DirectionsResult | undefined
  >(undefined);

  @Output() routeChange =
    new EventEmitter<google.maps.DirectionsResult>();

  markerPositions: google.maps.LatLng[] = [];
  waypoints: google.maps.DirectionsWaypoint[] = [];;

  constructor(private directionsService: MapDirectionsService) {}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  ngOnChanges() {
    this.initializeMap();
  }

  initializeMap() {
    const fromLocation = this.from?.location;
    const toLocation = this.to?.location;

    if (this.waypointsInput) {
      this.waypoints = this.waypointsInput!.map((way: any) => {
        const waypoint:google.maps.DirectionsWaypoint = {
          stopover: true,
          location: way?.location,
        };
  
        return waypoint;
      })
    }

    let directionDirty: boolean = false;

    // verifica se mapa ja foi inicializado para poder cair no else
    if (fromLocation && toLocation) {
      directionDirty = true;
    }

    if (fromLocation && toLocation) {
      this.getDirections(fromLocation, toLocation);
    } else if (fromLocation) {
      this.goToLocation(fromLocation);
    } else if (toLocation) {
      this.goToLocation(toLocation);
    } else {
      if (directionDirty) {
        this.markerPositions = [];
        this.map?.panTo(this.center);
        this.zoom = 10;
        this.defineDirections(undefined);
      }
    }
  }

  goToLocation(location: google.maps.LatLng) {
    this.markerPositions = [location];
    this.map.panTo(location);
    this.zoom = 17;
    this.defineDirections(undefined);
  }

  getDirections(from: google.maps.LatLng, to: google.maps.LatLng) {
    this.loading.emit(true);
    const request: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: this.waypoints,
    };

    this.directionsService
      .route(request)
      .pipe(map((res) => res.result))
      .subscribe((result) => {
        if (result) {
          this.defineDirections(result);
          this.markerPositions = [];
          this.loading.emit(false);
        }
      });
  }

  defineDirections(result: google.maps.DirectionsResult | undefined) {
    this.directionsResult$.next(result);
    this.routeChange.emit(result);
  }
}
