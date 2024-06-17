import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseLocation } from '../../../../shared/helpers/filter-location.helper';
import { LiftDetail } from '../../../../shared/interfaces/global-interfaces';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';
import { LocalService } from '../../../../shared/services/local.service';
import { ToastService } from '../../../../shared/services/toast-service.service';

@Component({
  selector: 'app-lift-history',
  templateUrl: './lift-history.component.html',
  styleUrl: './lift-history.component.scss',
})
export class LiftHistoryComponent implements OnInit {
  lifts: any[] = [];

  constructor(
    private serviceHttp: BaseResourceService<LiftDetail[]>,
    public localService: LocalService,
    public toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.serviceHttp
      .customAction(
        'GET',
        `history?id=1${this.localService.user.user_id}`,
        null
      )
      .subscribe({
        next: (res: LiftDetail[]) => {
          if (res) {
            res.map((res) => {
              res.start_location = parseLocation(res.start_location);
              res.end_location = parseLocation(res.end_location);
            });

            this.lifts = res;
            this.lifts.sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            );
          }
        },
        error: (err) => {
          this.toast.showToastError('Houve um erro ao carregar a lista');
        },
      });
  }

  offerLift() {
    this.router.navigate(['/offer-lift']);
  }
}
