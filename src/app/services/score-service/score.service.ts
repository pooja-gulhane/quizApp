import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreSubject = new BehaviorSubject<number>(0); // Initial value of 0
  score$ = this.scoreSubject.asObservable(); // Expose the observable

  // Method to update the score
  setScore(score: number) {
    this.scoreSubject.next(score);
  }
}
