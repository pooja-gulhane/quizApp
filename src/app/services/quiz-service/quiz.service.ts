import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserProfile } from 'src/app/models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(public http: HttpClient) { }

  getQuizzesNotTakenByUser(userId: number): Observable<any> {
    const apiUrl = `http://localhost:8080/quiz/not-taken/${userId}`;
    console.log(apiUrl)

    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        if(response) {
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
}
