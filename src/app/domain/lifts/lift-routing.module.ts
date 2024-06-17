import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiftListComponent } from './pages/lift-list/lift-list.component';
import { LiftDetailComponent } from './pages/lift-detail/lift-detail.component';
import { LiftHistoryComponent } from './pages/lift-history/lift-history.component';

const routes: Routes = [
  {
    path: '',
    component: LiftListComponent,
  },
  {
    path: 'history',
    component: LiftHistoryComponent,
  },
  {
    path: ':id',
    component: LiftDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiftRoutingModule {}
