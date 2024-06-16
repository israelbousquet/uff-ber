import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BaseResourceService } from '../../../../shared/services/base-resource.service';
import { Vehicle } from '../../../../shared/interfaces/global-interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  form!: FormGroup;
  isMobile: boolean = false;

  veiculo!: Vehicle;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public serviceHttp: BaseResourceService<Array<Vehicle>>
  ) {}

  ngOnInit() {
    this.buildForm();
    this.serviceHttp.customAction('GET', 'vehicles', null).subscribe((res) => {
      if (res) console.log(res);
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      model: [null, Validators.required],
      color: [null, Validators.required],
      type: [null, Validators.required],
    });
  }

  onSubmit() {
    this.serviceHttp
      .customAction('POST', 'vehicles', this.form.value)
      .subscribe((res) => {
        if (res) console.log(res);
      });
  }

  returnControl(campo: string) {
    return this.form.get(campo) as FormControl;
  }
}
