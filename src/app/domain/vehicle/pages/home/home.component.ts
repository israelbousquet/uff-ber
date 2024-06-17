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
import { LocalService } from '../../../../shared/services/local.service';
import { mercosulPlateValidator } from '../../../../validators/customValidators';

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
    public serviceHttp: BaseResourceService<Array<Vehicle>>,
    public local: LocalService
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
      license_plate: [null, [Validators.required]],
      capacity: [null, Validators.required],
      color: [null, Validators.required],
      type: [null, Validators.required],
    });
  }

  onSubmit() {
    const body = {
      driver_id: this.local.user.driver_id,
      model: this.form.value.model,
      license_plate: this.form.value.license_plate,
      capacity: this.form.value.capacity,
      color: this.form.value.color,
      type: +this.form.value.type,
    };

    this.serviceHttp
      .customAction('POST', 'vehicles', { vehicle: body })
      .subscribe((res) => {
        if (res) console.log(res);
      });
  }

  returnControl(campo: string) {
    return this.form.get(campo) as FormControl;
  }
}
