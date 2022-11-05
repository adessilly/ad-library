import { Component, OnInit, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ad-button-switch',
  templateUrl: './ad-button-switch.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdButtonSwitchComponent),
      multi: true
    }
  ],
  styleUrls: [
    './ad-button-switch-theme-flip.component.css',
    './ad-button-switch-theme-switch.component.css'
  ]
})
export class AdButtonSwitchComponent implements OnInit {

  @Input() labelOn = 'on';
  @Input() labelOff = 'off';
  @Input() iconOn!: string;
  @Input() iconOff!: string;
  @Input() theme = 'flip';

  ngValue!: boolean;

  onChangeCallback: any = () => {};
  onTouchedCallback: any = () => {};

  constructor() {}

  ngOnInit() {
    /*
    if (!this.id && this.theme === 'switch') {
      throw new Error('Attribute id is required for AdSwitchComponent with theme switch');
    }
    */
  }

  setValueFromComponent(v: boolean) {
    this.ngValue = v;
    this.onChangeCallback(v);
  }

  setValueFromParent(v: boolean) {
    this.ngValue = v;
  }

  // @Override ControlValueAccessor
  writeValue(v: any) {
    this.setValueFromParent(v);
  }

  // @Override ControlValueAccessor
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // @Override ControlValueAccessor
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  switchValue() {
    if (this.ngValue) {
      this.ngValue = false;
    } else {
      this.ngValue = true;
    }
    this.setValueFromComponent(this.ngValue);
  }

  toggleCheck(input: any) {
    input.checked = !input.checked;
    this.switchValue();
  }

}
