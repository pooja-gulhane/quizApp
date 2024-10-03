import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { SubmitUserResponseDTO } from 'src/app/models/question/nextAndPreviousQuestion/submitUserResponseDTO';
import { HttpParams } from '@angular/common/http';
import { CurrentAndNextResponseDTO } from 'src/app/models/question/nextAndPreviousQuestion/currentAndNextResponseDTO';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http: HttpClient,public authService: AuthService) { }
  
  getQuestionsByQuiz(quizId: number, userId: number): Observable<any> {
    const apiUrl = `http://localhost:8080/questions/quiz/${quizId}/user/${userId}`;

    const headers = this.authService.getRequestHeaders()

    return this.http.get<any>(apiUrl,{headers}).pipe(
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
    const headers = this.authService.getRequestHeaders()

    const apiUrl = `http://localhost:8080/quiz/next`;
    console.log(currentAndNextResponseDTO);
    return this.http.post<any>(apiUrl, currentAndNextResponseDTO,{headers}).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Get previous question based on current response
  getPreviousQuestion(currentAndPreviousResponseDTO: any): Observable<any> {
    const headers = this.authService.getRequestHeaders()

    const apiUrl = `http://localhost:8080/quiz/previous`;
    return this.http.post<any>(apiUrl, currentAndPreviousResponseDTO,{headers}).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  submitUserResponses(currentAndNextResponseDTO:CurrentAndNextResponseDTO): Observable<any> {
    const headers = this.authService.getRequestHeaders()

    const apiUrl = `http://localhost:8080/quiz/userResponses`;
    return this.http.post<any>(apiUrl,currentAndNextResponseDTO,{headers}).pipe(
      map(response=>{return {data:response}}),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
