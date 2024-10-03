import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizDetail } from 'src/app/models/quiz';
import { ScoreService } from 'src/app/services/score-service/score.service';
import { QuizHistoryComponent } from '../quiz-history/quiz-history.component';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  score: number = 0;
  totalScore: number = 0;
  quizId!: number; 

  constructor(private scoreService: ScoreService,private route: ActivatedRoute, private quizService: QuizService) {}

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
      this.quizId = +params.get('quizId')!;  
      console.log("Quiz ID:", this.quizId);

      this.quizService.getQuizDetails(this.quizId).subscribe(
        (quiz) => {
          this.totalScore = quiz.quizTotalMarks; 

        },
        (error) => {
          console.error('Error fetching quiz details', error);
        }
      );
    });

    this.scoreService.score$.subscribe(score => {
      this.score = score;
    });
  }
}

