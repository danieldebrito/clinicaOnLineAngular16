import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ERole } from 'src/app/auth/class/usuario';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';

@Component({
  selector: 'app-pre-sign-up',
  templateUrl: './pre-sign-up.component.html',
  styleUrls: ['./pre-sign-up.component.scss']
})
export class PreSignUpComponent {
  constructor(
    public router: Router,
    private usuariosSv: UsuariosService) {}


  public redirectCreate(role: string) {
    this.router.navigate(['sign-up']);

    if(role == 'paciente'){
      this.usuariosSv.role = ERole.paciente;
    }else{
      this.usuariosSv.role = ERole.especialista;
    }
  }
}
