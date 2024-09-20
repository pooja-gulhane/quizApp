import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoreService } from 'src/app/services/score-service/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  score: number = 0;

  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {
    // Subscribe to score changes
    this.scoreService.score$.subscribe(score => {
      this.score = score;
    });
  }
}

