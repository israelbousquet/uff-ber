import { Component, OnInit } from '@angular/core';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';

@Component({
  selector: 'app-lift-list',
  templateUrl: './lift-list.component.html',
  styleUrl: './lift-list.component.scss'
})
export class LiftListComponent implements OnInit {
  lifts: any[] = [];

  constructor(private serviceHttp: BaseResourceService<any>) {}

  ngOnInit() {
    this.serviceHttp.customAction("GET", "lifts", null).subscribe(res => {
      if (res) {
        this.lifts = res;
        console.log(this.lifts)
      }
    })

    // this.racesData = [
    //   {
    //     user: {
    //       name: 'Israel Onias Bousquet',
    //       addres: {
    //         logradouro: 'Estrada Vereador Luiz Carlos da Silva',
    //         numero: '584',
    //         bairro: 'Colubandê'
    //       }
    //     },
    //     race: {
    //       distance: '15 km',
    //       duration: '2H30',
    //       passengers: [
    //         { name: 'John Smith' },
    //         { name: 'Freud' },
    //         { name: 'Mc Lan' },
    //         { name: 'Messi' },
    //       ],
    //       route: {
    //         origin: 'Terminal Rodoviário de Alcãntara',
    //         destination: 'UFF Praia Vermelha'
    //       }
    //     },
    //     driver: {
    //       avaliation: 4.5,
    //       name: 'Josevaldo Da Silva'
    //     }
    //   },
    //   {
    //     user: {
    //       name: 'Israel Onias Bousquet',
    //       addres: {
    //         logradouro: 'Estrada Vereador Luiz Carlos da Silva',
    //         numero: '584',
    //         bairro: 'Colubandê'
    //       }
    //     },
    //     race: {
    //       distance: '15 km',
    //       duration: '2H30',
    //       passengers: [
    //         { name: 'John Smith' },
    //         { name: 'Freud' },
    //         { name: 'Mc Lan' },
    //         { name: 'Messi' },
    //       ],
    //       route: {
    //         origin: 'Terminal Rodoviário de Alcãntara',
    //         destination: 'UFF Praia Vermelha'
    //       }
    //     },
    //     driver: {
    //       avaliation: 4.5,
    //       name: 'Josevaldo Da Silva'
    //     }
    //   },
    //   {
    //     user: {
    //       name: 'Israel Onias Bousquet',
    //       addres: {
    //         logradouro: 'Estrada Vereador Luiz Carlos da Silva',
    //         numero: '584',
    //         bairro: 'Colubandê'
    //       }
    //     },
    //     race: {
    //       distance: '15 km',
    //       duration: '2H30',
    //       passengers: [
    //         { name: 'John Smith' },
    //         { name: 'Freud' },
    //         { name: 'Mc Lan' },
    //         { name: 'Messi' },
    //       ],
    //       route: {
    //         origin: 'Terminal Rodoviário de Alcãntara',
    //         destination: 'UFF Praia Vermelha'
    //       }
    //     },
    //     driver: {
    //       avaliation: 4.5,
    //       name: 'Josevaldo Da Silva'
    //     }
    //   },
    // ]
  }
}
