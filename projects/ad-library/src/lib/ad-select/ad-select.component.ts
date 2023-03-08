import {
  Component, Input, ElementRef, OnChanges, AfterContentInit,
  SimpleChanges, ViewChild, forwardRef, OnDestroy
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

declare var $: any;

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
export class AdSelectComponent implements AfterContentInit, ControlValueAccessor, OnChanges {

  public innerValue: any;
  public onChangeCallback!: (_:any) => void;
  public onTouchedCallback!: () => void;
  public currentSelectValue: any;
  public simpleMode = true;

  @Input() values!: any[];
  @Input() id!: string;
  @Input() required = false;
  @Input() readonly = false;
  @Input() autofocusSearch = true;

  @ViewChild('select2', { static: true }) select2Html: any;

  constructor(private element: ElementRef) {
  }

  // @Override AfterContentInit
  ngAfterContentInit() {
      this.initSelect2();
  }

  setValueFromSelect(v: any) {
      this.innerValue = v;
      this.onChangeCallback(v);
  }

  setValueFromParent(v: any) {
      this.innerValue = v;
      this.initSelect2();
  }

  // update select2 -> parent
  updateData(event: any) {

      if (event) {

          if (event instanceof Array) {

              let valArray: Object[] = [];
              for (const item of event) {
                  if (item.value !== undefined) {
                      valArray = [...valArray, item.value];
                  } else {
                      valArray = [...valArray, item];
                  }
              }

              this.setValueFromSelect(valArray);

          } else {

              if (event.value !== undefined) {
                  this.setValueFromSelect(event.value);
              } else {
                  this.setValueFromSelect(event);
              }
          }
      }

  }

  /**
   * Vider le select2 au cas où il existait déjà
   */
  emptySelect2() {
      const jqSelect2: any = $(this.select2Html.nativeElement);
      jqSelect2.select2({data: null, language: this.getSelect2Lang});
      jqSelect2.html('');
      jqSelect2.off('change');
      jqSelect2.off('select2:close');
  }

  /**
   * Initialiser le select2
   */
  initSelect2() {
      this.emptySelect2();
      const self = this;

      // init select2
      const jqSelect2: any = $(this.select2Html.nativeElement);
      jqSelect2.select2({
          data: this.values,
          language: this.getSelect2Lang,
          width: '100%',
          multiple: (this.innerValue instanceof Array)
      });

      jqSelect2.on('select2:close', function (e: any) {
          self.onTouchedCallback();
      });

      if(this.autofocusSearch) {
        const result = jqSelect2.on('select2:open', (e: any) => {
          const searchField: any = document.querySelector('.select2-dropdown.select2-dropdown--below .select2-search__field');
          if (searchField) {
           searchField.focus();
          }
        });
      }

      // -> setValue (oninit)
      if (this.innerValue) {
          this.currentSelectValue = this.convertValueForSelect2(this.innerValue);
          jqSelect2.val(this.currentSelectValue).trigger('change');
      }

      // <- getValue (onchange)
      jqSelect2.on('change', function() {
          const obj = jqSelect2.select2('val');
          let val = null;
          if (obj instanceof Array) {
              val = self.findArrayObjFromArrayVal(obj);
          } else {
              val = self.findObjFromVal(obj);
          }
          self.updateData(val);
      });

  }

  // Pour sélectionner un élément dans le select2, il ne faut pas fournir l'objet,
  // mais l'id de cet objet. Si c'est un array, c'est un array d'ids
  convertValueForSelect2(obj: any): any {
      if (obj instanceof Array) {
          return this.convertArrayObjToArrayId(obj);
      } else {
          return this.convertObjToId(obj);
      }
  }

  // Convertir un array d'objets en array d'ids (voir convertValueForSelect2)
  convertArrayObjToArrayId(arrayObj: Object[]): string[] {
      let arraySelect2Vals: string[] = [];

      for (const value of arrayObj) {
          const select2val = this.convertObjToId(value);
          arraySelect2Vals = [ ...arraySelect2Vals, select2val ];
      }

      return arraySelect2Vals;
  }

  // Convertir un objets en string contenant l'id (voir convertValueForSelect2)
  // ou renvoyer un string
  convertObjToId(obj: any): string {
      if (obj.id) {
          return obj.id;
      } else {
          return obj.toString();
      }
  }

  findArrayObjFromArrayVal(valArrayFromSelect2: Array<Object>) {
      let objectValue: Object[] = [];
      for (const value of valArrayFromSelect2) {
        const select2Val = this.findObjFromVal(value);
          if (select2Val != null) {
              objectValue = [...objectValue, select2Val];
          }
      }
      return objectValue;
  }

  findObjFromVal(val: any) {
      for (const value of this.values) {
          if (value.id && '' + value.id === '' + val) {
              return value;
          }
          if (!value.id && '' + value.id === '' + val) {
              return value;
          }
      }
      return null;
  }

  getSelect2Lang() {
      return {
        errorLoading: () => 'Le résultat ne peut être affiché.',
        inputTooLong: (args: any) => 'Veuillez supprimer des caractères.',
        inputTooShort: (args: any) => 'Veuillez saisir des caractères.',
        loadingMore: (args: any) => 'Chargement des résultats...',
        maximumSelected: (args: any) => 'Vous ne pouvez sélectionner que ' + args.maximum + ' valeurs',
        noResults: () => 'Aucun résultat',
        searching: () => 'Recherche en cours...'
    };
  }

  // on change PARENT COMPOSANT -> SELECT COMPOSANT
  // ->Si on modifie dans un composant parent la valeur, il faut rafraîchir la select
  // pour peut être sélectionner ou désélectinoner la select
  // https://angular.io/docs/ts/latest/api/core/index/OnChanges-class.html
  // @Override ControlValueAccessor
  writeValue(v: any) {
      this.setValueFromParent(v);
  }

  // ngChange doit aussi être utilisé si on change la liste (et pas l'element selectionne)
  ngOnChanges(changes: SimpleChanges) {
      this.initSelect2();
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
