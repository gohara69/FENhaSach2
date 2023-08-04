import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserOnLogin } from '../model/usermodel/UserOnLogin.model';
import { UserService } from '../service/User.service';
import { Router } from '@angular/router';
import { shareService } from '../service/share';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: UserOnLogin = new UserOnLogin();
  submmited = false;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private userService : UserService,
    private router : Router,
    private share : shareService,
  ){

  }

  submitLoginForm(){
    this.submmited = true;
    if(this.loginForm.valid){
      this.user.username = this.loginForm.get('email')?.value ?? "";
      this.user.password = this.loginForm.get('password')?.value ?? "";
      this.userService.getUser(this.user).subscribe(data => {
        if(data.id != 0){
          this.user = data;
          localStorage.setItem('userLogin', JSON.stringify(this.user));
          this.share.sendStatusData(true);
          if(this.user.role == 'user'){
            this.router.navigateByUrl('client-home')
          } else if(this.user.role == 'admin'){
            this.router.navigateByUrl('admin');
          }
        }          
      });
    }
  }
}
