import { Component } from '@angular/core';
import { AdSelectElement } from 'projects/ad-library/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ad-library';
  checkValue = false;
  checkValue2 = false;
  loading = false;

  select2Selected: AdSelectElement = { text: 'Label 5', id: '4', /* value: monObjetLié */ };
  select2Values: AdSelectElement[] = [
    { text: 'Label 1', id: '0', /* value: monObjetLié */ } as AdSelectElement,
    { text: 'Label 2', id: '1', /* value: monObjetLié */ } as AdSelectElement,
    { text: 'Label 3', id: '2', /* value: monObjetLié */ } as AdSelectElement,
    { text: 'Label 4', id: '3', /* value: monObjetLié */ } as AdSelectElement,
    this.select2Selected
  ];



}
