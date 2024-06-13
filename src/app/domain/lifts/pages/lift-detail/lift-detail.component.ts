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
  isLoading = false;

  locationFrom = {
    address: "São Gonçalo Shopping - Rodovia Niterói - Manilha - Boa Vista, São Gonçalo - RJ, Brasil",
    name: "São Gonçalo Shopping",
    location: new google.maps.LatLng(-22.8141147, -43.0704788),
  }

  locationTo = {
    address: "UFF - Praia Vermelha Campus - Rua Passo da Pátria - São Domingos, Niterói - RJ, Brasil",
    name: "Universidade Federal Fluminense - Campus Praia Vermelha",
    location: new google.maps.LatLng(-22.9048625, -43.1316667),
  }
  
  constructor(private route: ActivatedRoute, private serviceHttp: BaseResourceService<any>) {}

  ngOnInit(): void {
    this.inicializeParams();
    console.log(this.locationFrom)
    console.log(this.locationTo)
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
