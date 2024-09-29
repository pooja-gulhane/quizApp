import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserCredentials } from 'src/app/models/user-credentials';
import { UserResponse } from 'src/app/models/user-response';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userProfile: UserResponse;
  public isLoggedIn: boolean
  errorFlag: boolean

  canActivate(): boolean {
    if (this.isLoggedIn && this.userProfile.jwt)
      return true
    return false
  }

  constructor(public http: HttpClient, public router: Router) {
    this.userProfile = new UserResponse()
    this.errorFlag = false
    this.isLoggedIn = false
  }

  register(user: User) {
    let savedUser: any;
    this.http.post<any>("http://localhost:8080/users/register", user).subscribe(response => console.log(response))
  }

  loginUser(user: UserCredentials): Observable<any> {
 
    this.isLoggedIn = false
    this.errorFlag = false
 
    return this.http.post<any>("http://localhost:8080/auth/login", user).pipe(
      map(response => {
        console.log(response)
        if(response) {
          Object.assign(this.userProfile, response)
          this.isLoggedIn = true
          localStorage.setItem('currentUser', JSON.stringify(response.jwt))
          return {success: true, data: response}
        } else {
          throw new Error('Login Failed')
        }
      }),
      catchError(error => {
        this.errorFlag = true
        console.log("Login Error", error)
        return throwError(error)
      })
    );
  }

  getLoggedInUser(): Observable<any> {
    const headers = this.getRequestHeaders()
    return this.http.get<any>("http://localhost:8080/users", {headers}).pipe(
      map(response => {
        return {data: response}
      }),
      catchError(error => {
        this.router.navigateByUrl("/signin")
        return throwError(error)
      })
    )

  }

  getRequestHeaders(): any {
    var userObj = localStorage.getItem('currentUser')
    if(userObj !== null) {
      const jwt = JSON.parse(userObj)
      return new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    }
  }

   // Logout method
   logout(): void {
    localStorage.removeItem('currentUser'); // Remove user data from local storage
    this.isLoggedIn = false; // Update the login state
    this.userProfile = new UserResponse(); // Reset the user profile
  }
}