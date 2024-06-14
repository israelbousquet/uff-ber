import { Component, OnInit } from '@angular/core';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';
import { Observable, map } from 'rxjs';
import { LocalService } from '../../../../shared/services/local.service';
import { Lift } from '../../../../shared/interfaces/global-interfaces';
import { parseLocation } from '../../../../shared/helpers/filter-location.helper';
import { ToastService } from '../../../../shared/services/toast-service.service';

@Component({
  selector: 'app-lift-list',
  templateUrl: './lift-list.component.html',
  styleUrl: './lift-list.component.scss'
})
export class LiftListComponent implements OnInit {
  lifts: any[] = [];

  constructor(
    private serviceHttp: BaseResourceService<Lift[]>, 
    public localService: LocalService,
    public toast: ToastService
  ) {}

  ngOnInit() {
    this.serviceHttp.customAction("GET", "lifts", { driver: this.localService.userIsDriver }).subscribe({
      next: (res: Lift[]) => {
        if (res) {
          res.map(res => {
            res.start_location = parseLocation(res.start_location);
            res.end_location = parseLocation(res.end_location);
          })

          this.lifts = res;
        }
      },
      error: err => {
        this.toast.showToastError("Houve um erro ao carregar a lista");
      }
    })
  }
}
