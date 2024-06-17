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

  isHistory: boolean = false;

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

          if (this.lift.lift.status !== 'active') {
            this.isHistory = true;
          }
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
        lift: this.lift,
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

  goBack() {
    if (this.isHistory) {
      this.router.navigate(['lifts/history']);
    } else {
      this.router.navigate(['/lifts'])
    }
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
    const passengers = this.lift.waypoints.length;
    let texto = `${passengers} passageiros`;

    if (passengers == 1) {
      texto = '1 passageiro';
    }

    if (passengers == 0) {
      texto = 'Sem passageiros';
    }

    return texto;
  }

  get colorStatus(): string {
    const colors: { [key: string]: string } = {
      active: 'rgb(6, 223, 6)',
      pending: 'rgb(249 193 1)',
      cancelled: 'rgb(217 24 24)',
      ended: 'var(--blue-primary-color)',
    };

    return colors[this.lift?.lift?.status!] || 'rgb(217 24 24)';
  }

  get getStatus(): string {
    const situacoes: { [key: string]: string } = {
      active: 'Em andamento',
      pending: 'Sem motorista',
      ended: 'Finalizada',
      cancelled: 'Cancelada',
    };

    return situacoes[this.lift?.lift?.status!];
  }
}
