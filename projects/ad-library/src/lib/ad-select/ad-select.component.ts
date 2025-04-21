import {
  Component, Input, OnChanges,
  SimpleChanges, ViewChild, forwardRef, AfterViewInit
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import { AdSelectElement } from './ad-select-element.interface';
import Choices from 'choices.js';


@Component({
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdSelectComponent),
      multi: true
  }],
  selector: 'ad-select',
  templateUrl: 'ad-select.component.html',
  styleUrls: ['ad-select.component.css']
})
export class AdSelectComponent implements AfterViewInit, ControlValueAccessor, OnChanges {

  public onChangeCallback!: (_:any) => void;
  public onTouchedCallback!: () => void;

  public currentSelectId: string | string[] | null = null;

  @Input() values: AdSelectElement[] = [];
  @Input() readonly = false;
  @Input() placeholder : string | null = null;
  @Input() showSelectedItems = true;
  multiple = true;

  @ViewChild('selectHTML', { static: true }) selectHTML: any;
  choiceSelect: any | null = null;

  constructor() {
  }

  refreshSelect() {
    setTimeout(() => {
      this.choiceSelect?.destroy();
      const options = {
        removeItemButton: true,
        placeholder: this.placeholder ? true : false,
        placeholderValue: this.placeholder,
        loadingText: 'Chargement...',
        noResultsText: 'Pas de résultats',
        noChoicesText: 'Pas de choix à sélectionner',
        itemSelectText: '',
        uniqueItemText: 'Seule une valeur peut être ajoutée',
        customAddItemText: 'Seules les valeurs correspondant à des conditions spécifiques peuvent être ajoutées',
      };
      this.choiceSelect = new Choices(this.selectHTML.nativeElement, options);
      const values = this.mergeValuesWithSelectValues();
      this.choiceSelect.setChoices(values, 'id', 'text', false);

    });
  }

  isSelected(id: string): boolean {
    const ids = Array.isArray(this.currentSelectId) ? this.currentSelectId : [this.currentSelectId];
    return ids.includes(id);
  }

  mergeValuesWithSelectValues() {
      return this.values.map(v => {
        return {
          id: v.id,
          text: v.text,
          selected: this.isSelected(v.id)
        }
      });
  }

  // @Override AfterContentInit
  ngAfterViewInit() {
    this.refreshSelect();
  }

  // ngChange doit aussi être utilisé si on change la liste (et pas l'element selectionne)
  ngOnChanges(changes: SimpleChanges) {
    if(this.selectHTML) {
      this.refreshSelect();
    }
  }

  setValueFromSelect(ids: string | string[]) {
    ids = Array.isArray(ids) ? ids : [ids];
    this.currentSelectId = ids;
    const objects = this.getObjectsFromIds(ids);
    const value = this.multiple ? objects : (objects.length > 0 ? objects[0] : null);
    this.onChangeCallback(value);
  }

  getObjectsFromIds(ids: string[]): any[] | string[] {
    return this.values.filter(v => ids.includes(v.id)).map(v => v.value? v.value : v);
  }

  setValueFromParent(obj: any) {
    this.multiple = Array.isArray(obj);
    if (this.multiple) {
      this.selectValuesFromArrayObjects(obj);
    } else {
      this.selectValuesFromObject(obj);
    }
    this.refreshSelect();
  }

  selectValuesFromArrayObjects(objects: any[]) {
    this.currentSelectId = [];
    for(const obj of objects) {
      const value = this.getValueFromObject(obj);
      const id = value ? value.id : null;
      if(value && id) {
        this.currentSelectId.push(id);
      }
    }
  }

  selectValuesFromObject(object: any) {
    this.currentSelectId = [];
    const value = this.getValueFromObject(object);
    const id = value ? value.id : null;
    if(value && id) {
      this.currentSelectId = id;
    }
  }

  getValueFromObject(obj: any):AdSelectElement | null {
    const index = this.values.findIndex(v => {
      const shouldCompareId = obj?.id !== undefined && obj?.id !== null;
      return this.compareObjectReferenceOrProperties(shouldCompareId ? v.id : v.value ?? v, shouldCompareId ? obj.id : obj)
    });
    return index >= 0 ? this.values[index] : null;
  }

  compareObjectReferenceOrProperties(obj1: any, obj2: any): boolean {
    return obj1 === obj2 || JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  // on change PARENT COMPOSANT -> SELECT COMPOSANT
  // @Override ControlValueAccessor
  writeValue(v: any) {
    this.setValueFromParent(v);
    console.log('writeValue', this.currentSelectId);
  }

  // @Override ControlValueAccessor
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // @Override ControlValueAccessor
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}
