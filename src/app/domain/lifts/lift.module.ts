import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiftRoutingModule } from './lift-routing.module';
import { LiftListComponent } from './pages/lift-list/lift-list.component';
import { ItemListaComponent } from './components/item-lista/item-lista.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { LiftDetailComponent } from './pages/lift-detail/lift-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LiftHistoryComponent } from './pages/lift-history/lift-history.component';
import { LiftAtualComponent } from './pages/lift-atual/lift-atual.component';

@NgModule({
  declarations: [LiftListComponent, ItemListaComponent, LiftDetailComponent, LiftHistoryComponent, LiftAtualComponent],
  imports: [
    CommonModule,
    LiftRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    SharedModule,
  ],
})
export class LiftModule {}
