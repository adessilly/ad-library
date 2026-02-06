import { Component, TemplateRef, Input, ViewChild, input } from '@angular/core';

@Component({
    selector: 'ad-tab-panel',
    templateUrl: './ad-tab-panel.component.html',
    styleUrls: ['./ad-tab-panel.component.scss'],
    standalone: false
})
export class AdTabPanelComponent {

  @ViewChild(TemplateRef, { static: false }) template!: TemplateRef<any>;
  @Input() label!: string;
  @Input() icon!: string;
  @Input() titleMessage = '';
  @Input() withStyle = false;
  @Input() disabled = false;
  
  readonly route = input<string | string[] | null>(null);

}
