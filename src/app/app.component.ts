import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  innerWidth!: number;
  isLargeScreen!: boolean;

  links: any[] = []

  constructor() {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.isLargeScreen = this.innerWidth > 900;
    this.changeLinkByScreenResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.isLargeScreen = this.innerWidth > 800;
    this.changeLinkByScreenResize();
  }

  changeLinkByScreenResize() {
    let links: any[];

    if (this.isLargeScreen) {
      links = [
        {
          name: 'Procurar',
          icon: 'search',
          routerLink: '/search',
        },
        {
          name: 'Oferecer carona',
          icon: 'add_circle',
          routerLink: '/oferecer-carona',
        },
      ]
    } else {
      links = [
        {
          icon: 'search',
          routerLink: '/search',
        },
      ];
    }

    this.links = links;
  }
}
