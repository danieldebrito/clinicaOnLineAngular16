import { Component } from '@angular/core';
import { AuthService } from "src/app/auth/services/auth.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ERole, Usuario } from '../../class/usuario';
import { UsuariosService } from '../../services/usuarios.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public usuariosAccesoRapido: Usuario[] = [];

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    public authService: AuthService,
    public usuariosSv: UsuariosService
  ) { }

  public login(email: string, password: string){
    let user: Usuario = {
      email: email,
      password: password
    }
    this.authService.SignIn(user);
  }

  public loguear(item){

    let user: Usuario = {
      email: item.email,
      password: item.password
    }

    this.authService.SignIn(user);

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

  public accesosRapidos(){
    this.usuariosSv.getItems().subscribe( usuarios => {

      const pacientes: Usuario[] = usuarios.filter(usuario => usuario.role === ERole.paciente).slice(0, 3);
      const especialistas: Usuario[] = usuarios.filter(usuario => usuario.role === ERole.especialista).slice(0, 2);
      const admin: Usuario[] = usuarios.filter(usuario => usuario.role === ERole.administrador).slice(0, 1);

      this.usuariosAccesoRapido = pacientes.concat(especialistas.concat(admin));
      
      //console.log(this.usuariosAccesoRapido);

    } );
  }

  ngOnInit() { 
    this.accesosRapidos();
  }
}

