import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'ad-button-slide',
  templateUrl: './ad-button-slide.component.html',
  styleUrls: ['./ad-button-slide.component.css']
})
export class AdButtonSlideComponent {

  @Input() icon!: string;
  @Input() label!: string;
  @Input() background = '#aaa';
  @Input() backgroundOver!: string;
  @Input() foreground = 'white';
  @Input() foregroundOver!: string;
  @Input() mini = false;
  @Input() type = 'button';

  @Input() stopPropagation = true;

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    if(this.stopPropagation) {
      event.stopPropagation();
    }
  }

  constructor() { }

}
