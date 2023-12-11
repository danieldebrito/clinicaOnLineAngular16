import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ERole, Usuario } from 'src/app/auth/class/usuario';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';
import { EEstadoTurno, Turno } from 'src/app/class/turno';
import { turnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
})
export class MisTurnosComponent implements OnInit {
  public turnos: Turno[] = [];
  public currentUser: Usuario = { email: '', password: '' };

  constructor(
    private usuariosSv: UsuariosService,
    private afAuth: AngularFireAuth,
    private turnosSv: turnosService
  ) {}

  public turnoUpdate(turno: Turno) {
    this.turnosSv.update(turno.id, turno);
  }

  // USUARIOS //////////////////////////////////////////////////////////////////////////////////
  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemById(user.uid).subscribe((res) => {
          this.currentUser = res;

          console.table(this.currentUser);

        });
      } else {
        this.currentUser = { email: '', password: '' };
      }
    });
  }

  public getTurnos() {
    this.turnosSv.getItems().subscribe((res) => {
      const turnos: Turno[] = res;

      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.usuariosSv.getItemById(user.uid).subscribe((res) => {

            if (res.role == ERole.especialista) {
              this.turnos = turnos.filter(
                (t) => t.especialista.uid === this.currentUser.uid && t.estado != EEstadoTurno.cancelado
              );
            }
            if (res.role == ERole.paciente) {
              this.turnos = turnos.filter(
                (t) => t.paciente.uid === this.currentUser.uid
              );
            }
            if (res.role == ERole.administrador) {
              this.turnos = turnos;
            }
          });
        }
      });

      console.log(this.currentUser.role);
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getTurnos();
  }
}
