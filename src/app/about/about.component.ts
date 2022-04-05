import { Component, OnInit } from '@angular/core';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  faGithubSquare = faGithubSquare;
  faLinkedin = faLinkedin;

  constructor() { }

  ngOnInit(): void {
  }

}
