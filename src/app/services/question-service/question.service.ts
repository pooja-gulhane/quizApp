import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { SubmitUserResponseDTO } from 'src/app/models/question/nextAndPreviousQuestion/submitUserResponseDTO';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http: HttpClient) { }
  
  getQuestionsByQuiz(quizId: number): Observable<any> {
    const apiUrl = `http://localhost:8080/questions/quiz/${quizId}`;

    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        if(response) {
          return {data: response};
        } else {
          throw new Error('No Questions Found');
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }


   // Get next question based on current response
   getNextQuestion(currentAndNextResponseDTO: any): Observable<any> {
    const apiUrl = `http://localhost:8080/quiz/next`;
    console.log(currentAndNextResponseDTO);
    return this.http.post<any>(apiUrl, currentAndNextResponseDTO).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Get previous question based on current response
  getPreviousQuestion(currentAndPreviousResponseDTO: any): Observable<any> {
    const apiUrl = `http://localhost:8080/quiz/previous`;
    return this.http.post<any>(apiUrl, currentAndPreviousResponseDTO).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  submitUserResponses(userId: number, quizId: number): Observable<any> {
    let params = new HttpParams().set('userId', userId).set('quizId', quizId)
    const apiUrl = `http://localhost:8080/userResponses/${userId}/${quizId}`;
    return this.http.post<any>(apiUrl,{params}).pipe(
      map(response=>{return {data:response}}),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
