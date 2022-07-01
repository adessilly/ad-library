import { Component, OnInit, TemplateRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'ad-tab-panel',
  templateUrl: './ad-tab-panel.component.html',
  styleUrls: ['./ad-tab-panel.component.scss']
})
export class AdTabPanelComponent implements OnInit {

  @ViewChild(TemplateRef, { static: false }) template!: TemplateRef<any>;
  @Input() label!: string;
  @Input() icon!: string;
  @Input() titleMessage = '';
  @Input() withStyle = false;
  @Input() disabled = false;

  constructor() { }

  ngOnInit() {
  }

}
