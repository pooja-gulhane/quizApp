import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import { quiz } from 'src/app/models/quiz';

@Component({
  selector: 'app-explore-quiz',
  templateUrl: './explore-quiz.component.html',
  styleUrls: ['./explore-quiz.component.css']
})
export class ExploreQuizComponent{
  quizs: any[];

  constructor(public quizService: QuizService) {
    this.quizs = []
   }

  ngOnInit() {
    var userObj = localStorage.getItem('currentUser')
    if(userObj !== null) {
      var myUserDetails = JSON.parse(userObj)
      var userId = myUserDetails.userDTO.applicationUserId

      this.quizService.getQuizzesNotTakenByUser(userId).subscribe(
        response => {
          this.quizs = response.data;
        },
        error => {
          console.error('Error fetching quizzes', error);
        }
      );
    }
  }
}
