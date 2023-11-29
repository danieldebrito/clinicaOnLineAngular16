import { Component, OnInit } from '@angular/core';
import { Jornada } from 'src/app/class/jornada';
// import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';
import { Especialista } from 'src/app/class/usuarios/especialista';
import { Especialidad } from 'src/app/class/especialidad';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { EEstadoTurno, Turno } from 'src/app/class/turno';
import { JornadasService } from 'src/app/services/jornadas.service';
import { ERole, Usuario } from 'src/app/auth/class/usuario';
import { turnosService } from 'src/app/services/turnos.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Paciente } from 'src/app/class/usuarios/paciente';

import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

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

  public especialidades: string[] = [];
  public especialidadSeleccionadaNombre: String = '';
  public especialidadesNombre: string[] = [];

  public turnos: Turno[] = [];
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
    private especialidadesSv: EspecialidadesService,
    private jornadasSv: JornadasService,
    private turnosSv: turnosService,
    private _formBuilder: FormBuilder
  ) {}

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
      this.especialistas = res;
    });
  }

  // JORNADAS /////////////////////////////////////////////////////////////////////////////////
  public getJornadas() {
    this.jornadasSv.getItems().subscribe((res) => {
      this.jornadas = res;
    });
  }

  public getjornadasEspecialista(especialidad: string) {
    this.especialidadSeleccionadaNombre = especialidad;
    this.jornadasFiltradas = this.jornadas.filter(
      (j) =>
        j.especialidad == this.especialidadSeleccionadaNombre &&
        j.userUID == this.especialistaSeleccionado.uid
    );
  }

  // ESPECIALIDADES ////////////////////////////////////////////////////////////////////////////
  public getEspecialidadesEspecialista(event: Usuario) {
    this.especialidades = this.jornadas
      .filter((j) => j.userUID == event.uid)
      .map((jo) => jo.especialidad);
    this.especialistaSeleccionado = event;
  }

  // TURNOS ////////////////////////////////////////////////////////////////////////////////////
  public seleccionarTurno(turno: Turno) {
    this.turnoSeleccionado = turno;
  }

  public tomarTurno(turno: any) {
    turno.estado = EEstadoTurno.ocupado;
    this.turnosSv.addItem(turno);
  }

  // USUARIOS //////////////////////////////////////////////////////////////////////////////////
  private getCurretUser() {
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
    this.getEspecialistas();
    this.getCurretUser();
    this.getJornadas();
  }
}
