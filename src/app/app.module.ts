import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProblemSolvingComponent } from './problem-solving/problem-solving.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { IconModule, IconSetService } from '@coreui/icons-angular';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        FooterComponent,
        NavComponent,
        PagenotfoundComponent,
        ExperienceComponent,
        ProblemSolvingComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        FontAwesomeModule,
    ], providers: [provideHttpClient(withInterceptorsFromDi()),]
})
export class AppModule { }
