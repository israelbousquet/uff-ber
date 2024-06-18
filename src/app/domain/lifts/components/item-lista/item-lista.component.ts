import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Lift,
  LiftDetail,
} from '../../../../shared/interfaces/global-interfaces';
import { LocalService } from '../../../../shared/services/local.service';

@Component({
  selector: 'app-item-lista',
  templateUrl: './item-lista.component.html',
  styleUrl: './item-lista.component.scss',
})
export class ItemListaComponent implements OnInit {
  @Input() lift!: LiftDetail;
  @Input() isHistory: boolean = false;

  constructor(private router: Router, public local: LocalService) {}

  ngOnInit(): void {}

  goLift() {
    this.router.navigate(['/lifts', this.lift.id]);
  }

  get colorStatus(): string {
    const colors: { [key: string]: string } = {
      active: 'rgb(6, 223, 6)',
      pending: 'rgb(249 193 1)',
      cancelled: 'rgb(217 24 24)',
      ended: 'var(--blue-primary-color)',
    };

    return colors[this.lift.status!] || 'rgb(217 24 24)';
  }

  get getStatus(): string {
    const situacoes: { [key: string]: string } = {
      active: 'Em andamento',
      pending: 'Sem motorista',
      ended: 'Finalizada',
      cancelled: 'Cancelada',
    };

    return situacoes[this.lift.status!];
  }
}
