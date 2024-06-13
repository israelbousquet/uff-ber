import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';

@Component({
  selector: 'app-lift-detail',
  templateUrl: './lift-detail.component.html',
  styleUrl: './lift-detail.component.scss'
})
export class LiftDetailComponent implements OnInit {
  lift: any = {};
  constructor(private route: ActivatedRoute, private serviceHttp: BaseResourceService<any>) {}

  ngOnInit(): void {
    this.inicializeParams();
  }

  inicializeParams() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.serviceHttp.customAction("GET", `lifts/${id}`, null).subscribe({
        next: res => {
          if (res) {
            this.lift = res;
            this.loadAfterGet()
            console.log(this.lift)
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
