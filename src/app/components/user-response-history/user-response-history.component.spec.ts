import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResponseHistoryComponent } from './user-response-history.component';

describe('UserResponseHistoryComponent', () => {
  let component: UserResponseHistoryComponent;
  let fixture: ComponentFixture<UserResponseHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserResponseHistoryComponent]
    });
    fixture = TestBed.createComponent(UserResponseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
