import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdLibraryModule, AdTabsModule } from 'projects/ad-library/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TestpageComponent } from './testpage/testpage.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, AdLibraryModule, AdTabsModule, FormsModule, RouterOutlet,
    RouterModule.forRoot([
       {  path: 'testpage/:label', component: TestpageComponent }
  ])],
  bootstrap: [AppComponent]
})
export class AppModule { }
