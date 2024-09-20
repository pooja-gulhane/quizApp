import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApplicationUserRegisterDTO } from 'src/app/models/applicationUserRegisterDTO';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'http://localhost:8080'; // Replace with your backend API URL

  constructor(public http: HttpClient, public authService: AuthService) {}

  // Get user profile by ID
  getUserById(userId: number): Observable<{ data: ApplicationUserRegisterDTO }> {
    const headers = this.authService.getRequestHeaders()

    const url = `${this.apiUrl}/users/${userId}`;
    console.log(url);

    return this.http.get<ApplicationUserRegisterDTO>(url,{headers}).pipe(
      map(response => {
        if (response) {
          return { data: response }; // Wrapping response in data object
        } else {
          throw new Error('User not found');
        }
      }),
      catchError(error => {
        console.error('Error fetching user profile:', error);
        return throwError(() => new Error('Error fetching user profile'));
      })
    );
  }

  // Update user profile
  updateUserProfile(userId: number, updatedUser: ApplicationUserRegisterDTO): Observable<{ data: ApplicationUserRegisterDTO }> {
    const headers = this.authService.getRequestHeaders()
    const url = `${this.apiUrl}/users/${userId}`;
    console.log(url);

    return this.http.put<ApplicationUserRegisterDTO>(url, updatedUser,{headers}).pipe(
      map(response => {
        if (response) {
          return { data: response }; // Wrapping response in data object
        } else {
          throw new Error('Error updating profile');
        }
      }),
      catchError(error => {
        console.error('Error updating user profile:', error);
        return throwError(() => new Error('Error updating user profile'));
      })
    );
  }
}
