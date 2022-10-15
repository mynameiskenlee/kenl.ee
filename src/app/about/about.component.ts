import { Component, OnInit } from '@angular/core';
import { faGithubSquare, faLinkedin, faHackerrank } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  faGithubSquare = faGithubSquare;
  faLinkedin = faLinkedin;
  faHackerrank = faHackerrank;

  constructor() { }

  ngOnInit(): void {
  }

}
