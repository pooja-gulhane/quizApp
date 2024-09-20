import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { validateEmail } from 'src/app/validators/email-validator';
import { validatePassword } from 'src/app/validators/password-validator';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserCredentials } from 'src/app/models/user-credentials';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent{
  email: FormControl
  password: FormControl
  signInForm: FormGroup
  signinSuccess :boolean = false

  constructor(public authService: AuthService) {

    this.email = new FormControl('', [Validators.required, validateEmail()])
    this.password = new FormControl('', [Validators.required, Validators.minLength(8), validatePassword()])

    this.  signInForm = new FormGroup({
      email: this.email,
      password: this.password
    })

  }

  signInSubmit() {
    console.log(this.signInForm.value)
    let userCredentials: UserCredentials = {
      userEmail: this.signInForm.value.email,
      userPassword: this.signInForm.value.password
    }
    this.authService.loginUser(userCredentials).subscribe(response => {
      console.log(response)
      this.signinSuccess = true;
      this.signInForm.reset();
      this.signInForm.markAsPristine();  
    })
  }
}





// import { Component } from '@angular/core';
// import { User } from 'src/model/user';

// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.css']
// })
// export class SignInComponent {

//   user:User

//   constructor(){
//     this.user = new User()
//   }

//   signInSubmit(signInForm: any){
//     console.log(signInForm)
//     // api call
//     this.user = new User()
//     signInForm.form.markAsPristine()
//   }

// }