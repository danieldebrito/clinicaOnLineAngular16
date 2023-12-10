import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Turno } from 'src/app/class/turno';

@Component({
  selector: 'app-turnos-listado',
  templateUrl: './turnos-listado.component.html',
  styleUrls: ['./turnos-listado.component.scss'],
})
export class TurnosListadoComponent {
  @Input() turnos: [] = [];
  @Output() throwTurnoSeleccionado = new EventEmitter();

  public lanzarTurno(turno) {
    this.throwTurnoSeleccionado.emit(turno);
    console.log(turno);
  }
}
