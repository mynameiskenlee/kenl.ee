import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ProblemSolvingComponent } from './problem-solving/problem-solving.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'problem-solving', component: ProblemSolvingComponent
  },
  {
    path: '**', pathMatch: 'full',
    component: PagenotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
