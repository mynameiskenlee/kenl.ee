import { Component, OnInit } from '@angular/core';
import { faGithubSquare, faLinkedin, faHackerrank, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { cibLeetcode } from '@coreui/icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false
})
export class AboutComponent implements OnInit {
  faGithubSquare = faGithubSquare;
  faLinkedin = faLinkedin;
  faHackerrank = faHackerrank;
  cibLeetcode = cibLeetcode;
  faInstagramSquare = faInstagramSquare;
  constructor() { }

  ngOnInit(): void {
  }

}
