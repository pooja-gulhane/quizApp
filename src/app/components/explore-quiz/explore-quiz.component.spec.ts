import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreQuizComponent } from './explore-quiz.component';

describe('ExploreQuizComponent', () => {
  let component: ExploreQuizComponent;
  let fixture: ComponentFixture<ExploreQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreQuizComponent]
    });
    fixture = TestBed.createComponent(ExploreQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
