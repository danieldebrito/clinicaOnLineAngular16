import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Turno } from 'src/app/class/turno';

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.scss'],
})
export class TurnoDetalleComponent {
  @Input() turno: Turno = {};

  @Output() thowTurno = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.turno && changes.turno.currentValue) {
      // Aquí puedes realizar acciones cuando se recibe el turno
      console.log('Turno recibido:', this.turno);
      // Puedes emitir el evento después de recibir el turno si es necesario
      this.thowTurno.emit(this.turno);
      console.log(this.turno);
    }
  }

  public lanzaTurno() {
    this.thowTurno.emit(this.turno);
  }
}
