import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})
export class TestpageComponent {

  tabName = '';

  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.tabName = params['label'];
    });

  }

}
