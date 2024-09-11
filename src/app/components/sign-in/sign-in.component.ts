import { Component } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  user:User

  constructor(){
    this.user = new User()
  }

  signInSubmit(signInForm: any){
    console.log(signInForm)
    // api call
    this.user = new User()
    signInForm.form.markAsPristine()
  }

}