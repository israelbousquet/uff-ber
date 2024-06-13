import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-lista',
  templateUrl: './item-lista.component.html',
  styleUrl: './item-lista.component.scss'
})
export class ItemListaComponent {
  @Input() lift: any;

  constructor(private router: Router) {}

  goLift() {
    this.router.navigate(['/lifts', this.lift.id]);
  }
}
