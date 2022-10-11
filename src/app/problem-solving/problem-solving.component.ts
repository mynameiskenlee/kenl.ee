import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-problem-solving',
  templateUrl: './problem-solving.component.html',
  styleUrls: ['./problem-solving.component.css']
})
export class ProblemSolvingComponent implements OnInit {
  faGithubSquare = faGithubSquare;
  faLinkedin = faLinkedin;

  constructor(private http: HttpClient) { }

  data: any; 

  ngOnInit(): void {
    this.http.get('https://www.hackerrank.com/rest/hackers/_kltk/recent_challenges',
    { params: new HttpParams()
        .set('response_version', 'v2')
        .set('limit', 1000) })
    .subscribe(data => {
        this.data = data; // save the most recent data in the data property
        console.log('data', data); // can see this data
    });
  }
}

