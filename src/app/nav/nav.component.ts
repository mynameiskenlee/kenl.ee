import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
