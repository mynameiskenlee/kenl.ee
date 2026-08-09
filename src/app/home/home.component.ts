import { Component, OnInit } from '@angular/core';
import content from '../../content/site.json';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
  name = content.site.name;
  tagline = content.site.tagline;

  constructor() { }

  ngOnInit(): void {
  }

}
