import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { atencionPaciente } from 'src/app/class/atencionPaciente';
import { Turno } from 'src/app/class/turno';
import { turnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-atender-turno',
  templateUrl: './atender-turno.component.html',
  styleUrls: ['./atender-turno.component.scss']
})
export class AtenderTurnoComponent implements OnInit {

  public turno: any = {};
  public atencion: atencionPaciente = {};

  createForm = new FormGroup({
    altura: new FormControl('', [Validators.required, Validators.minLength(3)]),
    peso: new FormControl('', [Validators.required, Validators.minLength(3)]),
    temperatura: new FormControl('', [Validators.required, Validators.minLength(3)]),
    presion: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor( private turnosSv: turnosService ){}

  public createUser() {
    /*
    if (this.createForm.valid) {

      const habilitadoValue = this.createForm.value.habilitado === 'true' ? true : false;

      const newItem: Usuario = {

        altura: this.createForm.value.email ?? '',
        peso: this.createForm.value.password ?? '',
        temperatura: this.createForm.value.displayName ?? '',
        presion: this.createForm.value.photoURL ?? '',
      };

      // this.createUserAuth(newItem);
      this.authService.SignUp(newItem);


      console.log(newItem);
      //this.usuariosService.addItem(newItem);
    } else {
      console.log("El formulario no es válido, realiza alguna acción o muestra un mensaje de error.");
      // El formulario no es válido, realiza alguna acción o muestra un mensaje de error.
    }*/
  }

  getFormattedDate(): string {
    if (this.turno && this.turno.fecha && this.turno.fecha.toDate) {
      const date = this.turno.fecha.toDate();
      return date.toISOString();
    }
    return '';
  }



  ngOnInit() {
    this.turno = this.turnosSv.turnoAtender;

    console.log(this.turno);
  }

}
