import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('../../domain/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'lifts',
    loadChildren: () =>
      import('../../domain/lifts/listagem.module').then((m) => m.ListagemModule),
  },
  {
    path: 'offer-lift',
    loadChildren: () =>
      import('../../domain/offer-lift/offer-lift.module').then((m) => m.OfferLiftModule),
  },
]
