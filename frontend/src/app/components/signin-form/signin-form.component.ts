import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent {

  isLoading:boolean = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router:Router) { }

  get email(){
    return this.loginForm.controls.email;
  }  
  get password(){
    return this.loginForm.controls.password;
  }

  get emailValue(){
    return this.loginForm.value.email
  }
  get passwordValue(){
    return this.loginForm.value.password;
  }

  submit(){    
    if(this.loginForm.valid ){
      const user = {
        email: this.emailValue,
        password: this.passwordValue
      }; 
      this.authService.login(user as UserModel).subscribe({
        next:(value)=> {          
          this.authService.setIsLogin(true);
          this.authService.setToken(value.token);
          this.authService.setSession(value.user);
          this.authService.setCurrentUser(value.user as UserModel);    
          this.router.navigateByUrl('/books');      
        },
        error:(err)=> {       
          alert(err.error.message);
        },
      })
    }   
  }
}
