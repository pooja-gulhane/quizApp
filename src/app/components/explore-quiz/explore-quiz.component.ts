import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import { QuizDetail } from 'src/app/models/quiz';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-explore-quiz',
  templateUrl: './explore-quiz.component.html',
  styleUrls: ['./explore-quiz.component.css']
})
export class ExploreQuizComponent{
  quizs: any[];
  userName :string = "";
  

  constructor(public quizService: QuizService, public authService: AuthService) {
    this.quizs = []
   }

  ngOnInit() {

    var userObj = localStorage.getItem('currentUser')
    if(userObj !== null) {
      var jwt = JSON.parse(userObj)
      this.authService.getLoggedInUser().subscribe(response => {
        this.authService.userProfile.userDTO = response.data
        this.authService.userProfile.jwt = jwt
        this.authService.isLoggedIn = true

        const userId = this.authService.userProfile.userDTO.applicationUserId
        this.quizService.getQuizzesNotTakenByUser(userId).subscribe(
          response => {
            this.quizs = response.data;
          },
          error => {
            console.error('Error fetching quizzes', error);
          }
        );

        // this.router.navigateByUrl("/home")
      }),
      catchError(error => {
        return throwError(error)
      })

    }
  }
}
