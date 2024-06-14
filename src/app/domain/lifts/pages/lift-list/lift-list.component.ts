import { Component, OnInit } from '@angular/core';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lift-list',
  templateUrl: './lift-list.component.html',
  styleUrl: './lift-list.component.scss'
})
export class LiftListComponent implements OnInit {
  lifts: any[] = [];
  lifts$: Observable<Array<any>> = new Observable()

  constructor(private serviceHttp: BaseResourceService<any>) {}

  ngOnInit() {
    this.lifts$ = this.serviceHttp.customAction("GET", "lifts", null);

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
