import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSolvingComponent } from './problem-solving.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ProblemSolvingComponent', () => {
  let component: ProblemSolvingComponent;
  let fixture: ComponentFixture<ProblemSolvingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProblemSolvingComponent, HttpClientTestingModule, FontAwesomeModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemSolvingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
