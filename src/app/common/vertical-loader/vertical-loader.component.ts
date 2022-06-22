import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-loader',
  template: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./vertical-loader.component.scss']
})
export class VerticalLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
