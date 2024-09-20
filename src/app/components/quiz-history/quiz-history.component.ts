import { Component,OnInit } from '@angular/core';
import { QuizHistoryService } from 'src/app/services/quiz-history-service/quiz-history.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-quiz-history',
  templateUrl: './quiz-history.component.html',
  styleUrls: ['./quiz-history.component.css']
})
export class QuizHistoryComponent implements OnInit {
  quizHistory: any[] = [];
  
  constructor(private quizHistoryService: QuizHistoryService, private authService: AuthService) {}

  ngOnInit(): void {
    // Assuming you get the user's ID from AuthService
    const userId = this.authService.userProfile.userDTO.applicationUserId;
    console.log(userId);
    // Fetch quiz history data from the service
    this.quizHistoryService.getQuizHistory(userId).subscribe(
      (data) => {
        this.quizHistory = data;  // Assuming API returns an array of quiz history objects
        console.log(this.quizHistory);
      },
      (error) => {
        console.error('Error fetching quiz history', error);
      }
    );
  }
}