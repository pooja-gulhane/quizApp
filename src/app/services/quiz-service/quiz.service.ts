import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserProfile } from 'src/app/models/user-profile';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(public http: HttpClient, public authService: AuthService) { }

  getQuizzesNotTakenByUser(userId: number): Observable<any> {
    const apiUrl = `http://localhost:8080/quiz/not-taken/${userId}`;
    console.log(apiUrl)

    const headers = this.authService.getRequestHeaders()

    return this.http.get<any>(apiUrl, {headers}).pipe(
      map(response => {
        if(response) {
          console.log(response)
          return {data: response}
        } else {
          throw new Error('No Quizzes Found')
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

   getQuizDetails(quizId: number): Observable<any> {
    const apiUrl = `http://localhost:8080/quiz/${quizId}`;
    const headers = this.authService.getRequestHeaders();
    return this.http.get<any>(apiUrl, { headers }).pipe(
      map(response => {
        console.log(response)
        if (response) {
          return response;
        } else {
          throw new Error('Quiz not found');
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
