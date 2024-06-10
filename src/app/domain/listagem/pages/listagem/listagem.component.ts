import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})
export class ListagemComponent implements OnInit {
  racesData: any[] = [];

  ngOnInit() {
    this.racesData = [
      {
        user: {
          name: 'Israel Onias Bousquet',
          addres: {
            logradouro: 'Estrada Vereador Luiz Carlos da Silva',
            numero: '584',
            bairro: 'Colubandê'
          }
        },
        race: {
          distance: '15 km',
          duration: '2H30',
          passengers: [
            { name: 'John Smith' },
            { name: 'Freud' },
            { name: 'Mc Lan' },
            { name: 'Messi' },
          ],
          route: {
            origin: 'Terminal Rodoviário de Alcãntara',
            destination: 'UFF Praia Vermelha'
          }
        },
        driver: {
          avaliation: 4.5,
          name: 'Josevaldo Da Silva'
        }
      },
      {
        user: {
          name: 'Israel Onias Bousquet',
          addres: {
            logradouro: 'Estrada Vereador Luiz Carlos da Silva',
            numero: '584',
            bairro: 'Colubandê'
          }
        },
        race: {
          distance: '15 km',
          duration: '2H30',
          passengers: [
            { name: 'John Smith' },
            { name: 'Freud' },
            { name: 'Mc Lan' },
            { name: 'Messi' },
          ],
          route: {
            origin: 'Terminal Rodoviário de Alcãntara',
            destination: 'UFF Praia Vermelha'
          }
        },
        driver: {
          avaliation: 4.5,
          name: 'Josevaldo Da Silva'
        }
      },
      {
        user: {
          name: 'Israel Onias Bousquet',
          addres: {
            logradouro: 'Estrada Vereador Luiz Carlos da Silva',
            numero: '584',
            bairro: 'Colubandê'
          }
        },
        race: {
          distance: '15 km',
          duration: '2H30',
          passengers: [
            { name: 'John Smith' },
            { name: 'Freud' },
            { name: 'Mc Lan' },
            { name: 'Messi' },
          ],
          route: {
            origin: 'Terminal Rodoviário de Alcãntara',
            destination: 'UFF Praia Vermelha'
          }
        },
        driver: {
          avaliation: 4.5,
          name: 'Josevaldo Da Silva'
        }
      },
    ]
  }
}
