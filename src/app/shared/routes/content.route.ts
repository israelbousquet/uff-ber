import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'lifts',
    loadChildren: () =>
      import('../../domain/lifts/lift.module').then((m) => m.LiftModule),
  },
  {
    path: 'offer-lift',
    loadChildren: () =>
      import('../../domain/offer-lift/offer-lift.module').then(
        (m) => m.OfferLiftModule
      ),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('../../domain/perfil/perfil.module').then((m) => m.PerfilModule),
  },
  {
    path: 'vehicle',
    loadChildren: () =>
      import('../../domain/vehicle/veiculo.module').then(
        (m) => m.VeiculoModule
      ),
  },
  {
    path: '**',
    redirectTo: 'lifts',
  },
];
