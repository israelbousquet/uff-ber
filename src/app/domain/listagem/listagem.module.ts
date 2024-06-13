import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListagemRoutingModule } from './listagem-routing.module';
import { LiftListComponent } from './pages/lift-list/lift-list.component';
import { ItemListaComponent } from './components/item-lista/item-lista.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { LiftDetailComponent } from './pages/lift-detail/lift-detail.component';

@NgModule({
  declarations: [
    LiftListComponent,
    ItemListaComponent,
    LiftDetailComponent
  ],
  imports: [
    CommonModule,
    ListagemRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule
  ]
})
export class ListagemModule { }
