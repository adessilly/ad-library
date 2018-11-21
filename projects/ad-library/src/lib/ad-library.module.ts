import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdButtonSlideComponent } from './ad-button-slide/ad-button-slide.component';
import { AdButtonSwitchComponent } from './ad-button-switch/ad-button-switch.component';

@NgModule({
  declarations: [AdButtonSlideComponent, AdButtonSwitchComponent],
  imports: [
    CommonModule, FormsModule,
  ],
  exports: [AdButtonSlideComponent, AdButtonSwitchComponent]
})
export class AdLibraryModule { }
