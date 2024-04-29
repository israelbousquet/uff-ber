import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('../../domain/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'lista',
    loadChildren: () =>
      import('../../domain/listagem/listagem.module').then((m) => m.ListagemModule),
  },
]
