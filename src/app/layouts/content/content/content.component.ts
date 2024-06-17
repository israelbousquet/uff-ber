import { Component, HostListener, OnInit } from '@angular/core';
import { LocalService } from '../../../shared/services/local.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast-service.service';
import Swal from 'sweetalert2';
import { SwalService } from '../../../shared/services/swal.service';

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
    public toast: ToastService,
    public swal: SwalService
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
      {
        name: 'Histórico',
        icon: 'manage_search',
        routerLink: '/lifts/history',
      },
      {
        name: 'Carona atual',
        icon: 'map',
        routerLink: '/lifts/actual',
      },
    ];

    this.links = links;
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }

  logout() {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja sair da sua conta?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.localService.remove('user');
        this.router.navigate(['/auth/login']);
        this.swal.showMessage('Deslogado com sucesso!', 'success');
      }
    });
  }
}
