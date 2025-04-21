import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdSelectElement } from 'projects/ad-library/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ad-library';
  checkValue = false;
  checkValue2 = false;
  loading = false;
  formGroup!: FormGroup;
  readOnly = false;

  select2Selected = [{nom:'label 5', prenom:'toto'}, { text: 'Label 2', id: '2' }];
  select2Values: AdSelectElement[] = [
    { text: 'Label empty -1', id: '-1', /* value: monObjetLié */ value: null } as AdSelectElement,
    { text: 'Label specific value ds qdqs qd qs dqs dqs dqsd qsd1', id: 'lol', /* value: monObjetLié */ value: 'dsqdsq' } as AdSelectElement,
    this.select2Selected[1] as AdSelectElement,
    { text: 'Label 3', id: '3', /* value: monObjetLié */ } as AdSelectElement,
    { text: 'Label 4', id: '4', /* value: monObjetLié */ } as AdSelectElement,
    { text: 'label 5', id: '5', value: this.select2Selected[0] }
  ];

  constructor(public fb: FormBuilder) {
    this.formGroup = this.fb.group({
      "married": [null, Validators.required]
    });
  }

  askDelete() {
    console.log('ask delete');
  }

  askConsultRow() {
    console.log('ask consult row');
  }


}
