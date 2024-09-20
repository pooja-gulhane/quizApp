import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';  // Assuming you have an AuthService like in QuizService

@Injectable({
  providedIn: 'root'
})
export class UserResponseService {

  private apiUrl = 'http://localhost:8080'; // Your backend API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserResponsesByQuizAndUser(quizId: number, userId: number): Observable<any[]> {
    const apiUrl = `${this.apiUrl}/quiz/${quizId}/user/${userId}`;
    
    const headers = this.authService.getRequestHeaders();

    return this.http.get<any[]>(apiUrl, { headers }).pipe(
      map(response => {
        if (response) {
          return response; 
        } else {
          throw new Error('No user responses found');
        }
      }),
      catchError(error => {
        console.error('Error fetching user responses:', error);
        return throwError(error);
      })
    );
  }
}

