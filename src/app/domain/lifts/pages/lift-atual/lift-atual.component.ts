import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filterLiftDetail } from '../../../../shared/helpers/filter-location.helper';
import { LiftDetail } from '../../../../shared/interfaces/global-interfaces';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';
import { LocalService } from '../../../../shared/services/local.service';
import { MatDialog } from '@angular/material/dialog';
import { formatDuration } from '../../../../shared/helpers/format.helper';
import Swal from 'sweetalert2';
import { SwalService } from '../../../../shared/services/swal.service';

@Component({
  selector: 'app-lift-atual',
  templateUrl: './lift-atual.component.html',
  styleUrl: './lift-atual.component.scss',
})
export class LiftAtualComponent {
  liftDetail!: LiftDetail;
  waypoints: google.maps.DirectionsWaypoint[] = [];
  durationLift: string = '';

  constructor(
    private router: Router,
    private serviceHttp: BaseResourceService<LiftDetail>,
    public localService: LocalService,
    public swal: SwalService
  ) {}

  ngOnInit(): void {
    this.getLift();
  }

  // chamadas

  getLift() {
    this.serviceHttp.customAction('GET', this.endpoint, null).subscribe({
      next: (res: LiftDetail) => {
        if (res) {
          filterLiftDetail(res);
          this.liftDetail = res;
        }
      },
      error: (err) => {
        throw err;
      },
    });
  }

  endLift() {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja finalizar a corrida?',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.liftMethod({ verbo: 'finalizar', normal: 'finalizada' }, 'finish');
      } else if (result.isDismissed) {
        this.swal.showMessage('Operação cancelada', 'info');
      }
    });
  }

  cancelLift() {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja cancelar a corrida?',
      showCancelButton: true,
      confirmButtonText: 'Sim!',
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.liftMethod({ verbo: 'cancelar', normal: 'cancelada' }, 'cancel');
      } else if (result.isDismissed) {
        this.swal.showMessage('Operação cancelada', 'info');
      }
    });
  }

  liftMethod(messages: { verbo: string; normal: string }, path: string) {
    this.serviceHttp
      .customAction('POST', `/lifts/${this.liftDetail.id}/${path}`, null)
      .subscribe({
        next: (res) => {
          this.swal.showMessage(
            `Corrida ${messages.normal} com sucesso!`,
            'success'
          );
          console.log(res);
        },
        error: (err) => {
          this.swal.showMessage(
            `Não foi possível ${messages.verbo} a corrida`,
            'error'
          );
          console.log(err);
        },
      });
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

  // gets
  get endpoint(): string {
    let text = `/passengers/${this.localService.user.passenger_id}/actual_lift`;

    if (this.localService.userIsDriver) {
      text = `/drivers/${this.localService.user.driver_id}/actual_lift`;
    }

    return text;
  }
}
