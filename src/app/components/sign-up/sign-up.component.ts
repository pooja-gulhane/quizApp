import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateEmail } from 'src/app/validators/email-validator';
import { validatePassword } from 'src/app/validators/password-validator';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  firstName: FormControl
  lastName: FormControl
  email: FormControl
  password: FormControl

  signUpForm: FormGroup;

  signupSuccess: boolean = false;
  countdown: number = 5;
  
  constructor(public http: HttpClient, public authService: AuthService,public router: Router) {
    this.firstName = new FormControl('', [Validators.required])
    this.lastName = new FormControl('', [Validators.required])
    this.email = new FormControl('', [Validators.required, validateEmail()])
    this.password = new FormControl('', [Validators.required, Validators.minLength(8), validatePassword()])

    this.signUpForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    })
  }

  signUpSubmit() {
    let user: User = {
      applicationUserFirstName: this.signUpForm.value.firstName,
      applicationUserLastName: this.signUpForm.value.lastName,
      applicationUserEmail: this.signUpForm.value.email,
      applicationUserPassword: this.signUpForm.value.password
    }
    console.log(this.signUpForm.value)
    console.log(user)
    this.authService.register(user);
    this.signupSuccess = true;

    this.signUpForm.reset();
    this.signUpForm.markAsPristine();


     // Start the countdown and redirect after 5 seconds
     const intervalId = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(intervalId); // Clear interval after countdown ends
        this.router.navigate(['/signin']); // Redirect to the sign-in page
      }
    }, 1000); 

  }

  // signUpSubmit() {
  //   if (this.signUpForm.valid) {
  //     let user = {
  //       applicationUserFirstName: this.signUpForm.value.firstName,
  //       applicationUserLastName: this.signUpForm.value.lastName,
  //       applicationUserEmail: this.signUpForm.value.email,
  //       applicationUserPassword: this.signUpForm.value.password,
  //     }

  //     this.http.post<any>('http://localhost:8080/users/register', user).subscribe(res => {
  //       console.log("======= RESPONSE ======");
  //       console.log(res);
  //       this.signUpForm.reset();
  //       this.signUpForm.markAsPristine();
  //     });
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }
}
