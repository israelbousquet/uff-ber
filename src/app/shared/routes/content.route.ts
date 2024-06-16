import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: 'lifts',
    loadChildren: () =>
      import('../../domain/lifts/lift.module').then((m) => m.LiftModule),
  },
  {
    path: 'offer-lift',
    loadChildren: () =>
      import('../../domain/offer-lift/offer-lift.module').then((m) => m.OfferLiftModule),
  },
  {
    path: '**',
    redirectTo: 'lifts'
  },
]
