import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuizHistoryService {

  public apiUrl = 'http://localhost:8080/quiztaken/user';

  constructor(public http: HttpClient,public authService: AuthService) { }

  // Function to get quiz history of a user
  getQuizHistory(userId: number): Observable<any[]> {
    const headers = this.authService.getRequestHeaders()
    const apiUrlWithUser = `${this.apiUrl}/${userId}`;
  
    return this.http.get<any>(apiUrlWithUser,{headers}).pipe(
      map(response => {
        // Assuming the response is an object, but you need an array for *ngFor
        return Array.isArray(response) ? response : [response]; // Ensures it's an array
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }  
}
