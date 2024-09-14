import { Component } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
  ngOnInit(): void {
    const state = window.history.state as { score: number };
    if (state) {
      const score = state.score;
      console.log(score);
    }
  }
}
