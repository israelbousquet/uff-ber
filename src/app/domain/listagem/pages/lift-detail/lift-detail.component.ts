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
    imageUrl: "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXVBeFA1YtzlSPkTyu-2pOtmraQbMKNcgd0PChF-lvkgr-tAYdljK7tWbCIM27MTysJFKktdzoOy7xDS9Ib5mux4abvKOI6i_kU49XDvfSHzXoydznYxkn1AponFW_24xt-QgGBMNpK7fggbvNloqca8kOu875QhWkMNNydY4n4t7f8P&3u500&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A4200%2Fhome&key=AIzaSyDU7JPV6woPoZwVMHFJnegfTaGPJQFHHrQ&token=103515",
    iconUrl: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png"
  }

  locationTo = {
    address: "UFF - Praia Vermelha Campus - Rua Passo da Pátria - São Domingos, Niterói - RJ, Brasil",
    name: "Universidade Federal Fluminense - Campus Praia Vermelha",
    location: new google.maps.LatLng(-22.9048625, -43.1316667),
    imageUrl: "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXXbkSwWgEn6LdRhdcpTKlqZ0HReLPdHCXNuwprlDNqmuZS5ue3j_-mpfEHJ3tjJEcBI3Qsl884p52pu1ErHaCnsEp4OhQHF3-k4mZUZRDbzAPt2jw0TpWOiVTv20kFvQhlHFORHs6yUHam6QGb5u6TUHel0LVTLZ5vttQcieae9Pv2E&3u500&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A4200%2Fhome&key=AIzaSyDU7JPV6woPoZwVMHFJnegfTaGPJQFHHrQ&token=23400",
    iconUrl: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png"
  }
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
