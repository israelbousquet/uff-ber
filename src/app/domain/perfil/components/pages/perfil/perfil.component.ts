import { Component, OnInit } from '@angular/core';
import { BaseResourceService } from '../../../../../shared/services/base-resource.service';
import { LocalService } from '../../../../../shared/services/local.service';
import { UserDetail } from '../../../../../shared/interfaces/global-interfaces';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  perfil!: UserDetail;

  constructor(
    private serviceHttp: BaseResourceService<UserDetail>,
    public local: LocalService
  ) {}

  ngOnInit() {
    this.serviceHttp.customAction('GET', `users/${this.local.user.user_id}`, null).subscribe({
      next: (res: UserDetail) => {
        if (res) {
          this.perfil = res;
        }
      },
      error: err => {}
    })
  }
}
