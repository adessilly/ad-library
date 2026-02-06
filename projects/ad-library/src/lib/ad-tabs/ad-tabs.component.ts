import { Component, AfterViewInit, EventEmitter, ChangeDetectorRef, Input, Output, ContentChildren, QueryList } from '@angular/core';
import { AdTabPanelComponent } from './ad-tab-panel/ad-tab-panel.component';
import { Router } from '@angular/router';

@Component({
    selector: 'ad-tabs',
    templateUrl: './ad-tabs.component.html',
    styleUrls: ['./ad-tabs.component.scss', './ad-tabs-theme.scss'],
    standalone: false
})
export class AdTabsComponent implements AfterViewInit {

  @Input() currentTab = 0;
  @Output() currentTabChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() isAdminContext = false;
  @Input() styleClass = 'comp-tabs-theme1';

  @ContentChildren(AdTabPanelComponent)
  tabPanels!: QueryList<AdTabPanelComponent>;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  private notifyCurrentTabChange() {
    this.currentTabChange.emit(this.currentTab);
  }

  ngAfterViewInit(): void {
    this.detectChanges();
  }

  detectChanges() {
    this.cdr.detectChanges();
  }

  gotoTab(disabled: boolean, tabIndex: number) {
    if (disabled) {
      return;
    }
    this.currentTab = tabIndex % this.tabPanels.length;
    const routeToGo = this.tabPanels.toArray()[this.currentTab].route();
    if(routeToGo) {
      this.router.navigate(Array.isArray(routeToGo) ? routeToGo : [routeToGo]);
    }
    this.detectChanges();
    this.notifyCurrentTabChange();
  }

}
