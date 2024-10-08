import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isSignIn: boolean = false;
  isLogIn:boolean = false;

  constructor(private authService:AuthService, private router:Router){
    this.authService.getIsSignIn().subscribe({
      next:(value)=>{
        this.isSignIn = value;
      },
    });
    this.authService.getIsLogin().subscribe({
      next:(value)=> {
        this.isLogIn = value;
      },
    });
  }

  showSignIn(){
    this.authService.setIsSignIn(true);
  }

  showSignUp(){
    this.authService.setIsSignIn(false);
  }

  logOut(){
    this.isSignIn = false;
    this.isLogIn = false;
    this.authService.logOut();
    this.authService.setIsLogin(false);
    this.router.navigateByUrl('');
  }
}
