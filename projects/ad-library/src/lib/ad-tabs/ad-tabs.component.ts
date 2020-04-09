import { Component, AfterViewInit, EventEmitter, ChangeDetectorRef, Input, Output, ContentChildren, QueryList } from '@angular/core';
import { AdTabPanelComponent } from './ad-tab-panel/ad-tab-panel.component';

@Component({
  selector: 'ad-tabs',
  templateUrl: './ad-tabs.component.html',
  styleUrls: ['./ad-tabs.component.scss', './ad-tabs-theme.scss']
})
export class AdTabsComponent implements AfterViewInit {

  @Input() currentTab = 0;
  @Output() currentTabChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() isAdminContext = false;
  @Input() styleClass = 'ad-tabs-theme1';

  @ContentChildren(AdTabPanelComponent)
  tabPanels: QueryList<AdTabPanelComponent>;

  constructor(private cdr: ChangeDetectorRef) {}

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
    this.detectChanges();
    this.notifyCurrentTabChange();
  }

}
