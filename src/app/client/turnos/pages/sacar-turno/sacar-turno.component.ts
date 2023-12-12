import { Component, OnInit } from '@angular/core';
import { Jornada } from 'src/app/class/jornada';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';
import { Especialista } from 'src/app/class/usuarios/especialista';
import { EEstadoTurno, Turno } from 'src/app/class/turno';
import { JornadasService } from 'src/app/services/jornadas.service';
import { ERole, Usuario } from 'src/app/auth/class/usuario';
import { turnosService } from 'src/app/services/turnos.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Paciente } from 'src/app/class/usuarios/paciente';

import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Especialidad } from 'src/app/class/especialidad';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.scss'],
})
export class SacarTurnoComponent implements OnInit {
  public active = 1;
  public disabled = true;

  public especialistas: Especialista[] = [];
  public especialistaSeleccionado: any = {};

  public especialidades: Especialidad[] = [];
  public especialidadSeleccionada: Especialidad = {};

  public turnos: Turno[] = [];
  public turnosHorariosDia: Turno[] = [];
  public turnoSeleccionado: Turno = {};

  public jornadas: Jornada[] = [];
  public jornadasFiltradas: Jornada[] = [];

  public paciente: Paciente = { email: '', password: '' };

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(
    private usuariosSv: UsuariosService,
    private afAuth: AngularFireAuth,
    private jornadasSv: JornadasService,
    private turnosSv: turnosService,
    private _formBuilder: FormBuilder
  ) {}

  tinyAlert() {
    Swal.fire('Turno Solicitado exitosamente!!');
  }

  //  mat-horizontal-stepper Angular Material  //////////////////////////////////////////////
  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  // ESPECIALISTAS ///////////////////////////////////////////////////////////////////////////
  public getEspecialistas() {
    this.usuariosSv.getItems().subscribe((res) => {
      this.especialistas = res.filter((usr) => usr.role == ERole.especialista);
    });
  }

  // JORNADAS /////////////////////////////////////////////////////////////////////////////////
  public getJornadas() {
    this.jornadasSv.getItems().subscribe((res) => {
      this.jornadas = res;
    });
  }

  public getjornadasEspecialista(especialidad: Especialidad) {
    this.especialidadSeleccionada = especialidad;
    this.jornadasFiltradas = this.jornadas.filter(
      (j) =>
        j.especialidad === this.especialidadSeleccionada &&
        j.userUID === this.especialistaSeleccionado.uid
    );
  }

  // ESPECIALIDADES ////////////////////////////////////////////////////////////////////////////
  public getEspecialidadesEspecialista(event: Usuario) {
    this.especialidades = this.jornadas
      .filter((j) => j.userUID === event.uid && j.especialidad) // Verificar especialidad no sea undefined
      .map((j) => j.especialidad);
    this.especialistaSeleccionado = event;
  }

  // TURNOS ////////////////////////////////////////////////////////////////////////////////////

  public getTurnos(){
    this.turnosSv.getItems().subscribe( res => {
      this.turnos = res;
    });
  }

  public seleccionarHorariosPorDiaTurnos(event) {
    this.turnosHorariosDia = event.turnos.filter(
      (e) =>
        e.fecha.getDate() === event.turnoSelect.fecha.getDate() &&
        e.fecha.getMonth() === event.turnoSelect.fecha.getMonth() &&
        e.fecha.getFullYear() === event.turnoSelect.fecha.getFullYear()
    );
  }

  public SeleccionarTurno(event) {
    this.turnoSeleccionado = event;
  }

  public tomarTurno(turno: any) {
    turno.estado = EEstadoTurno.pendiente;
    this.turnosSv.addItem(turno);

    this.turnoSeleccionado = {};
  }

  // USUARIOS //////////////////////////////////////////////////////////////////////////////////
  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemById(user.uid).subscribe((res) => {
          this.paciente = res;
        });
      } else {
        this.paciente = { email: '', password: '' };
      }
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getEspecialistas();
    this.getJornadas();
    this.getTurnos();
  }
}
