import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './components/pages/perfil/perfil.component';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PerfilComponent],
  imports: [CommonModule, PerfilRoutingModule, MatIconModule],
})
export class PerfilModule {}
