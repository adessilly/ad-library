import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdTabsComponent } from './ad-tabs.component';
import { AdTabPanelComponent } from './ad-tab-panel/ad-tab-panel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdTabsComponent, AdTabPanelComponent],
  exports: [AdTabsComponent, AdTabPanelComponent]
})
export class AdTabsModule { }
