import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';
import { Lift } from '../../../../shared/interfaces/global-interfaces';
import { convertToLatLng, parseLocation } from '../../../../shared/helpers/filter-location.helper';

@Component({
  selector: 'app-lift-detail',
  templateUrl: './lift-detail.component.html',
  styleUrl: './lift-detail.component.scss'
})
export class LiftDetailComponent implements OnInit {
  lift!: Lift;
  isLoading = false;
  
  constructor(private route: ActivatedRoute, private serviceHttp: BaseResourceService<Lift>) {}

  ngOnInit(): void {
    this.inicializeParams();
  }

  inicializeParams() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.serviceHttp.customAction("GET", `lifts/${id}`, null).subscribe({
        next: (res: Lift) => {
          if (res) {
            res.start_location = parseLocation(res.start_location);
            res.end_location = parseLocation(res.end_location);

            res.start_location = convertToLatLng(res.start_location);
            res.end_location = convertToLatLng(res.end_location);

            this.lift = res;
            this.loadAfterGet()
          }
        },
        error: err => {
          throw(err);
        }
      })
    })
  }

  loadAfterGet() {}
}
