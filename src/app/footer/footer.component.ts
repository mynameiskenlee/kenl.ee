import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
