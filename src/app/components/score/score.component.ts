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
     // Retrieve quizId from the URL
     this.route.paramMap.subscribe(params => {
      this.quizId = +params.get('quizId')!;  // Convert string to number
      console.log("Quiz ID:", this.quizId);

      // Fetch the total marks for the quiz
      this.quizService.getQuizDetails(this.quizId).subscribe(
        (quiz) => {
          this.totalScore = quiz.quizTotalMarks; // Assuming totalMarks is a field in your response

        },
        (error) => {
          console.error('Error fetching quiz details', error);
        }
      );
    });

    // Subscribe to score changes
    this.scoreService.score$.subscribe(score => {
      this.score = score;
    });
  }
}

