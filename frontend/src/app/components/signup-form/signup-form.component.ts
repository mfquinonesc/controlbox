import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent { 
  
  userForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],    
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordCopy: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private authService: AuthService, private formBuilder:FormBuilder, private router:Router){  }

  get email() {
    return this.userForm.controls.email;
  }

  get password() {
    return this.userForm.controls.password;
  }

  get passwordCopy() {
    return this.userForm.controls.passwordCopy;
  }

  get username() {
    return this.userForm.controls.username;
  }

  get emailValue() {
    return this.userForm.value.email;
  }

  get passwordValue() {
    return this.userForm.value.password;
  }

  get passwordCopyValue() {
    return this.userForm.value.passwordCopy;
  }

  get usernameValue() {
    return this.userForm.value.username;
  }

  submit(){ 
    if(this.userForm.valid && this.passwordValue == this.passwordCopyValue){
      const user = {
        email: this.emailValue,
        password: this.passwordValue,
        username: this.usernameValue
      };

      this.authService.signUp(user as UserModel).subscribe({
        next:(value)=> {
          alert('Se ha creado su cuenta. Ingrese consu correo y contraseña');
          this.authService.setIsSignIn(true);
        }, 
        error:(err) =>{
          alert(err.error.message);         
        },       
      });

    }else{
      alert('Datos inválidos');
    }
  }
}
