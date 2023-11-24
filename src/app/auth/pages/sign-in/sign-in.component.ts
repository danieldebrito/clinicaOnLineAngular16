import { Component } from '@angular/core';
import { AuthService } from "src/app/auth/services/auth.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../class/usuario';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    public authService: AuthService
  ) { }

  public login(email: string, password: string){
    let user: Usuario = {
      email: email,
      password: password
    }

    this.authService.SignIn(user);

    this.authService.SignIn
  }


  public AutoSignIn(){  /// login de prueba
    //this.loginForm.setValue( { email: 'danieldebrito@outlook.com', password: '123456' });

    let user: Usuario = {
      email: 'danieldebrito@outlook.com',
      password: '123456'
    }

    this.authService.SignIn(user);
  }

  public AutoSignInEmpleado(){  /// login de prueba
    //this.loginForm.setValue( { email: 'danieldebrito@outlook.com', password: '123456' });
    let user: Usuario = {
      email: 'danielrdebrito@gmail.com',
      password: '123456'
    }

    this.authService.SignIn(user);
  }

  ngOnInit() { }
}

