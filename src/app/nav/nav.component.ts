import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  imports: [RouterModule, MatIconModule]
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
