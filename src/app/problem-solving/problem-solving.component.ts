import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-problem-solving',
  templateUrl: './problem-solving.component.html',
  styleUrls: ['./problem-solving.component.css'],
  imports: [FontAwesomeModule]
})
export class ProblemSolvingComponent implements OnInit {
  faGithubSquare = faGithubSquare;
  faLinkedin = faLinkedin;

  constructor(private http: HttpClient) { }

  data: any; 

  ngOnInit(): void {
    this.http.get('/api/hackerrank',)
    .subscribe(data => {
        this.data = data; // save the most recent data in the data property
        console.log('data', data); // can see this data
    });
  }
}

