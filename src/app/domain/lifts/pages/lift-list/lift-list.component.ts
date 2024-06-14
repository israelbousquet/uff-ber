import { Component, OnInit } from '@angular/core';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';
import { Observable } from 'rxjs';
import { LocalService } from '../../../../shared/services/local.service';

@Component({
  selector: 'app-lift-list',
  templateUrl: './lift-list.component.html',
  styleUrl: './lift-list.component.scss'
})
export class LiftListComponent implements OnInit {
  lifts: any[] = [];
  lifts$: Observable<Array<any>> = new Observable()

  constructor(private serviceHttp: BaseResourceService<any>, public localService: LocalService) {}

  ngOnInit() {
    this.lifts$ = this.serviceHttp.customAction("GET", "lifts", { driver: this.localService.userIsDriver });

    // this.serviceHttp.customAction("GET", "lifts", null).subscribe({
    //   next: res => {
    //     if (res) {
    //       this.lifts = res;
    //       console.log(this.lifts)
    //     }
    //   },
    //   error: err => {

    //   }
    // })
  }
}
