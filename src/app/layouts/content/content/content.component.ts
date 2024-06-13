import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {
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
          routerLink: '/lifts',
        },
        {
          name: 'Oferecer carona',
          icon: 'add_circle',
          routerLink: 'offer-lift',
        },
      ]
    } else {
      links = [
        {
          icon: 'search',
          routerLink: '/lifts',
        },
        {
          icon: 'add_circle',
          routerLink: 'offer-lift',
        }
      ];
    }

    this.links = links;
  }
}
