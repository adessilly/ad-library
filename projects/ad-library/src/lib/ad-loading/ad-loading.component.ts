import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'ad-loading',
  templateUrl: './ad-loading.component.html',
  styleUrls: ['./ad-loading.component.css']
})
export class AdLoadingComponent {

  @Input()
  loading: any;

}
