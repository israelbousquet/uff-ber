import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-lista',
  templateUrl: './item-lista.component.html',
  styleUrl: './item-lista.component.scss'
})
export class ItemListaComponent implements OnInit {
  @Input() raceData: any;

  constructor() {}

  ngOnInit() {
  }
}
