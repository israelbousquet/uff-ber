import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lift } from '../../../../shared/interfaces/global-interfaces';

@Component({
  selector: 'app-item-lista',
  templateUrl: './item-lista.component.html',
  styleUrl: './item-lista.component.scss'
})
export class ItemListaComponent {
  @Input() lift!: Lift;

  constructor(private router: Router) {}
  
  goLift() {
    this.router.navigate(['/lifts', this.lift.id]);
  }
}
