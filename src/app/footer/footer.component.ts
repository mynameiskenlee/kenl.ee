import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
