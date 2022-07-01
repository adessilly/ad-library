import { Component } from '@angular/core';
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

  select2Selected: AdSelectElement = { text: 'Label 5', id: '4', /* value: monObjetLié */ };
  select2Values: AdSelectElement[] = [
    { text: 'Label empty', id: '-1', /* value: monObjetLié */ value: null } as AdSelectElement,
    { text: 'Label specific value', id: '0', /* value: monObjetLié */ value: '1' } as AdSelectElement,
    { text: 'Label 2', id: '1', /* value: monObjetLié */ } as AdSelectElement,
    { text: 'Label 3', id: '2', /* value: monObjetLié */ } as AdSelectElement,
    { text: 'Label 4', id: '3', /* value: monObjetLié */ } as AdSelectElement,
    this.select2Selected
  ];

  askDelete() {
    console.log('ask delete');
  }

  askConsultRow() {
    console.log('ask consult row');
  }


}
