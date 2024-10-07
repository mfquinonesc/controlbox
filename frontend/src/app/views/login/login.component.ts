import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLogin: boolean = false;

  constructor(private authService:AuthService){
    this.authService.getIsSignIn().subscribe({
      next:(value)=>{
        this.isLogin = value;
      },
    });
  }

}
