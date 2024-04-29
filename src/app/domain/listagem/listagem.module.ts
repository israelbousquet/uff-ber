import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListagemRoutingModule } from './listagem-routing.module';
import { ListagemComponent } from './pages/listagem/listagem.component';
import { ItemListaComponent } from './components/item-lista/item-lista.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    ListagemComponent,
    ItemListaComponent
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
