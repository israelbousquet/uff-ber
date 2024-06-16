import { Component, HostListener, OnInit } from '@angular/core';
import { LocalService } from '../../../shared/services/local.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast-service.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnInit {
  innerWidth!: number;
  isLargeScreen!: boolean;

  links: any[] = [];

  constructor(
    public localService: LocalService,
    private router: Router,
    public toast: ToastService
  ) {}

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
          name: this.localService.userIsDriver
            ? 'Oferecer carona'
            : 'Solicitar carona',
          icon: 'add_circle',
          routerLink: 'offer-lift',
        },
      ];
    } else {
      links = [
        {
          icon: 'search',
          routerLink: '/lifts',
        },
        {
          icon: 'add_circle',
          routerLink: 'offer-lift',
        },
      ];
    }

    this.links = links;
  }

  logout() {
    this.localService.remove('user');
    this.toast.showToastSucess('Deslogado com sucesso');
    this.router.navigate(['/auth/login']);
  }

  openVeiculo() {
    this.router.navigate(['vehicle']);
  }
}
