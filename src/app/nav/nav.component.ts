import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, RouterLinkActive]
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
