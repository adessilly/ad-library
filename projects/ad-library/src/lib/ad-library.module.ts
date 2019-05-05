import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdButtonSlideComponent } from './ad-button-slide/ad-button-slide.component';
import { AdButtonSwitchComponent } from './ad-button-switch/ad-button-switch.component';
import { AdLoadingComponent } from './ad-loading/ad-loading.component';

@NgModule({
  declarations: [AdButtonSlideComponent, AdButtonSwitchComponent, AdLoadingComponent],
  imports: [
    CommonModule, FormsModule,
  ],
  exports: [AdButtonSlideComponent, AdButtonSwitchComponent, AdLoadingComponent]
})
export class AdLibraryModule { }
