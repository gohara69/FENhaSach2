import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserOnLogin } from '../model/usermodel/UserOnLogin.model';
import { UserService } from '../service/User.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user: UserOnLogin = new UserOnLogin();
  submited = false;
  notMatch = false;
  signupForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    retypepassword: new FormControl('', [Validators.required])
  });

  constructor(
    private userService : UserService,
    private router : Router,
  ){

  }

  submitSignupForm(){
    this.submited = true;
    if(this.signupForm.valid){
      this.user.username = this.signupForm.get('email')?.value ?? "";
      this.user.password = this.signupForm.get('password')?.value ?? "";
      if(this.user.password != this.signupForm.get('retypepassword')?.value ?? ""){
        this.notMatch = true;
        return;
      }
      this.notMatch = false;
      this.user.role = 'user';
      this.userService.createNewUser(this.user).subscribe(data => {
        this.router.navigateByUrl('/signup-success');
      });
    }
  }
}
