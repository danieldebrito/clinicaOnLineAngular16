import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ERole } from 'src/app/auth/class/usuario';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';
import { EEstadoTurno, Turno } from 'src/app/class/turno';
import { Paciente } from 'src/app/class/usuarios/paciente';
import { turnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss'],
})
export class HistoriaClinicaComponent implements OnInit {
  public paciente: Paciente = { email: '', password: '' };
  public turnosPaciente: Turno[] = [];

  constructor(
    private usuariosSv: UsuariosService,
    private afAuth: AngularFireAuth,
    private turnosSv: turnosService
  ) {
    if (this.turnosSv.turnoPaciente) {
      this.paciente = this.turnosSv.turnoPaciente;
    }
  }

  getFormattedDate(fecha): string {
    const date = fecha.toDate();
    return date.toISOString();
  }

  // USUARIOS //////////////////////////////////////////////////////////////////////////////////
  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemById(user.uid).subscribe((res) => {
          if (res.role == ERole.paciente) {

            this.turnosSv.turnoPaciente = res;
            this.paciente = res;

            this.turnosSv.getItems().subscribe((res) => {
              const turnos: Turno[] = res;
        
              if (this.turnosSv.turnoPaciente) {
                this.turnosPaciente = turnos.filter(
                  (e) =>
                    e.paciente.uid == this.turnosSv.turnoPaciente.uid &&
                    e.estado == EEstadoTurno.cumplido
                );
              }
        
            });


          }
        });
      } else {
        this.paciente = { email: '', password: '' };
      }
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.turnosSv.getItems().subscribe((res) => {
      const turnos: Turno[] = res;

      if (this.turnosSv.turnoPaciente) {
        this.turnosPaciente = turnos.filter(
          (e) =>
            e.paciente.uid == this.turnosSv.turnoPaciente.uid &&
            e.estado == EEstadoTurno.cumplido
        );
      }

    });
  }
}
