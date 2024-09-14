import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserCredentials } from 'src/app/models/user-credentials';
import { UserResponse } from 'src/app/models/user-response';
import { catchError, map, Observable, throwError } from 'rxjs';

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

  constructor(public http: HttpClient) {
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
          console.log(response)
          var storedUser: any = {}
          Object.assign(storedUser, response)
          storedUser.password = user.userPassword
          localStorage.setItem('currentUser', JSON.stringify(storedUser))
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
}