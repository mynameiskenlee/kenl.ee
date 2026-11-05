import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pagenotfound',
    templateUrl: './pagenotfound.component.html',
    styleUrls: ['./pagenotfound.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PagenotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
