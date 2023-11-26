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


import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
	public especialistasFiltrados: Especialista[] = [];
	public especialista: any = {};

	public especialidades: Especialidad[] = [];
	public especialidadSeleccionadaNombre: String = '';
	public especialidadesNombre: String[] = [];

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
	) { }

	//  mat-horizontal-stepper Angular Material  /////////////////

	goBack(stepper: MatStepper){
		stepper.previous();
	}
	
	goForward(stepper: MatStepper){
		stepper.next();
	}

	// ESPECIALISTAS ///////////////////////////////////////////////////////////////////////////
	public getEspecialistas() {
		let usuarios: Usuario[] = [];
		this.usuariosSv.getItems().subscribe(res => {
			usuarios = res;
			this.especialistasFiltrados = this.especialistas = usuarios.filter(usr => usr.role == ERole.especialista);
			//this.especialistasFiltrados = this.especialistas = usuarios.filter(usr => usr.role == ERole.especialista);
		})
	}

	// ESPECIALIDADES ////////////////////////////////////////////////////////////////////////
	public getEspecialidades() {
		this.especialidadesSv.getItems().subscribe(res => {
			this.especialidades = res;
			console.log(res);
		});
	}

	public getEspecialidadesNombre() {
		this.jornadasSv.getItems().subscribe(res => {
			this.jornadas = res;

			this.jornadas.forEach(e => {
				const especialidad = e.especialidad || ''; // Asignación predeterminada en caso de ser undefined
				this.especialidadesNombre.push(especialidad);
			});

			this.especialidadesNombre = [...new Set(this.especialidadesNombre)];
		});
	}

	public getEspecialistasEspecialidad(event: any) {
		this.especialidadSeleccionadaNombre = event;

		let especialistasUIDS: string[] = this.jornadas
			.filter(j => j.especialidad === event)
			.map(j => j.userUID)
			.filter(uid => typeof uid === 'string') as string[];

		this.especialistasFiltrados = this.especialistas.filter(e => e.uid && especialistasUIDS.includes(e.uid));
	}

	// JORNADAS ///////////////////////////////////////////////////////////////////////////
	public getJornadas() {
		this.jornadasSv.getItems().subscribe(res => {
			this.jornadas = res;
		});
	}

	public getjornadasEspecialista(event: Usuario) {
		this.jornadasFiltradas = this.jornadas.filter(j => (j.especialidad == this.especialidadSeleccionadaNombre && j.userUID == event.uid));
		this.especialista = event;
	}

	// TURNOS ///////////////////////////////////////////////////////////////////////////
	public seleccionarTurno(turno: Turno) {
		this.turnoSeleccionado = turno;
	}

	public tomarTurno(turno: any) {

		turno.estado = EEstadoTurno.ocupado;

		this.turnosSv.addItem(turno);
	}

	// USUARIOS /////////////////////////////////////////////////////////////////////////
	private getCurretUser() {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.usuariosSv.getItemById(user.uid).subscribe(res => {
					this.paciente = res;
				});
			} else {
				this.paciente = { email: '', password: '' };
			}
		});
	}


	public tomar


	ngOnInit(): void {
		this.getEspecialistas();
		this.getEspecialidadesNombre();
		this.getCurretUser();
	}

}

