import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AtencionPaciente } from 'src/app/class/atencionPaciente';
import { turnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-atender-turno',
  templateUrl: './atender-turno.component.html',
  styleUrls: ['./atender-turno.component.scss']
})
export class AtenderTurnoComponent implements OnInit {

  public turno: any = {};
  public atencion: AtencionPaciente = {};


  createForm = new FormGroup({
    altura: new FormControl('', [Validators.required, Validators.min(10), Validators.max(999)]),
    peso: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    temperatura: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    presion: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
    resena: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });

  constructor(private turnosSv: turnosService) { }

  public createAtencion() {
    if (this.createForm.valid) {
      const newItem: AtencionPaciente = {
        altura: Number(this.createForm.value.altura),
        peso: Number(this.createForm.value.peso),
        temperatura: Number(this.createForm.value.temperatura),
        presion: Number(this.createForm.value.presion),
        resena: this.createForm.value.resena
      };

      // Assuming you have a method in turnosService to add the atencion
      //this.turnosSv.addAtencion(newItem);

      console.log(newItem);
    } else {
      console.log("El formulario no es válido, realiza alguna acción o muestra un mensaje de error.");
    }
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
