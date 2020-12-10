import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'ad-button-slide',
  templateUrl: './ad-button-slide.component.html',
  styleUrls: ['./ad-button-slide.component.css']
})
export class AdButtonSlideComponent implements OnInit {

  @Input() icon: string;
  @Input() label: string;
  @Input() background = '#aaa';
  @Input() backgroundOver = null;
  @Input() foreground = 'white';
  @Input() foregroundOver = null;
  @Input() mini = true;

  @Input() stopPropagation = true;

  @ViewChild('adbuttonslidediv', { static: true }) div: ElementRef<any>;

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    if(this.stopPropagation) {
      event.stopPropagation();
    }
  }

  constructor() { }

  public ngOnInit() {
    this.initStateCss();
  }

  public mouseOverButton($event) {
    this.initStateCssOver();
  }

  public mouseOutButton($event) {
    this.initStateCss();
  }

  public initStateCss() {
    this.changeCss('background', this.background);
    this.changeCss('color', this.foreground);
  }

  public initStateCssOver() {
    this.changeCss('background', this.backgroundOver);
    this.changeCss('color', this.foregroundOver);
  }

  public changeCss(property, value) {
    if (value === null) {
      return;
    }
    this.div.nativeElement.style[property] = value;
  }

}
