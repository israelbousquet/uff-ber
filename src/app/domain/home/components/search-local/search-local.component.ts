import { Component, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../../validators/customValidators';

@Component({
  selector: 'app-search-local',
  templateUrl: './search-local.component.html',
  styleUrl: './search-local.component.scss'
})
export class SearchLocalComponent {

  form!: FormGroup;
  isMobile: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
    this.form.get('date')?.setValue(new Date())
  }

  buildForm() {
    this.form = this.formBuilder.group({
      origin: [null, Validators.required],
      destiny: [null, [Validators.required, Validators.email]],
      date: [null, [Validators.required]]
    })
  }

  getControl(campo: string) {
    return this.form.get(campo) as FormControl;
  }

  search() {
    console.log(this.form.value)
  }
}
