import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';
import {
  Lift,
  LiftDetail,
} from '../../../../shared/interfaces/global-interfaces';
import {
  convertToLatLng,
  filteredIndivualLift,
  parseLocation,
} from '../../../../shared/helpers/filter-location.helper';
import { MatDialog } from '@angular/material/dialog';
import { OfferDialogComponent } from '../../../offer-lift/offer-dialog/offer-dialog.component';
import { formatDuration } from '../../../../shared/helpers/format.helper';
import { LocalService } from '../../../../shared/services/local.service';

@Component({
  selector: 'app-lift-detail',
  templateUrl: './lift-detail.component.html',
  styleUrl: './lift-detail.component.scss',
})
export class LiftDetailComponent implements OnInit {
  lift!: Lift;
  liftSemDriver!: Lift;
  waypoints: google.maps.DirectionsWaypoint[] = [];
  durationLift: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceHttp: BaseResourceService<Lift>,
    private dialog: MatDialog,
    public localService: LocalService
  ) {}

  ngOnInit(): void {
    this.inicializeParams();
    this.localService.userIsDriver;
  }

  inicializeParams() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getLift(id);
    });
  }

  // chamadas

  getLift(id: number) {
    this.serviceHttp.customAction('GET', `lifts/${id}`, null).subscribe({
      next: (res: Lift) => {
        if (res) {
          filteredIndivualLift(res);
          this.lift = res;
          this.createWaypoints(res);
          this.verifyLiftSemMotorista(res);
        }
      },
      error: (err) => {
        throw err;
      },
    });
  }

  verifyLiftSemMotorista(res: Lift) {
    if (res.lift.driver_id == null) {
      this.liftSemDriver = {
        ...res,
        lift: {
          ...res.lift,
          end_location: {
            location: this.waypoints[0].location,
          },
          start_location: {
            location: this.waypoints[1].location,
          },
        },
      };
    } else {
      this.liftSemDriver = res;
    }
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }

  routeChange(event: google.maps.DirectionsResult) {
    let totalSeconds = 0;

    event.routes.forEach((route) => {
      route.legs.forEach((leg) => {
        const duration = leg.duration?.value;
        if (duration) totalSeconds += duration;
      });
    });

    this.durationLift = formatDuration(totalSeconds);
  }

  addWaypoint() {
    const dialogRef = this.dialog.open(OfferDialogComponent, {
      data: {
        liftDetail: this.lift.lift,
      },
      width: '80vw',
      maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        location.reload();
      }
    });
  }

  // filtros

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

  // gets
  get liftDetail(): LiftDetail {
    if (this.lift?.lift?.driver_id) {
      return this.lift?.lift;
    } else {
      return this.liftSemDriver?.lift;
    }
  }

  get getPassengers(): string {
    let texto = `${this.waypoints.length} passageiros`;

    if (this.waypoints.length == 1) {
      texto = '1 passageiro';
    }

    if (this.waypoints.length == 0) {
      texto = 'Sem passageiros';
    }

    return texto;
  }
}
