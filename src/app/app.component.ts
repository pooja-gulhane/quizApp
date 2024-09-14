import { Component } from '@angular/core';
import { UserCredentials } from './models/user-credentials';
import { AuthService } from './services/auth-service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService, public router: Router) {}
  
  ngOnInit() {
    var userObj = localStorage.getItem('currentUser')
 
    if (userObj !== null) {
      var myUserDetails = JSON.parse(userObj)
      var userCreds: UserCredentials = new UserCredentials()
      userCreds.userEmail = myUserDetails.userDTO.applicationUserEmail
      userCreds.userPassword = myUserDetails.password
      console.log(userCreds)
      this.authService.loginUser(userCreds).subscribe(
        response => {
          this.router.navigateByUrl("/explore-quiz")
        },
        err => {
          console.error('Login Failed', err)
        }
      )
    }
    else
      this.router.navigateByUrl("/signin")
  }
 
}

