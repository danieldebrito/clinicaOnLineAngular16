import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';
import { Especialidad } from 'src/app/class/especialidad';
import { Turno } from 'src/app/class/turno';
import { Especialista } from 'src/app/class/usuarios/especialista';
import { Paciente } from 'src/app/class/usuarios/paciente';
import { turnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.scss'],
})
export class MisPacientesComponent implements OnInit {

  public pacientes: Paciente[] = [];
  public turnos: Turno[] = [];
  public currentEspecialista: Especialista = { email: '', password: '' };

  constructor(
    private afAuth: AngularFireAuth,
    private usuariosSv: UsuariosService,
    private turnosSv: turnosService
  ) {}

  public getPacientes() {
    this.usuariosSv.getItems().subscribe((res) => {
      this.pacientes = res;
    });
  }

  public misPacientes() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemById(user.uid).subscribe((especialista) => {
          this.turnosSv.getItems().subscribe( turnos => {
            this.turnos = turnos;
            this.pacientes = this.turnos.filter( t => t.especialista.uid === especialista.uid ).map( tn => tn.paciente );
          });
        });
      }
    });
  }

  // USUARIOS //////////////////////////////////////////////////////////////////////////////////
  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemById(user.uid).subscribe((res) => {
          this.currentEspecialista = res;
        });
      } else {
        this.currentEspecialista = { email: '', password: '' };
      }
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
    //this.getPacientes();
    this.misPacientes();
  }
}
