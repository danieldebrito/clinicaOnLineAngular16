import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from 'src/app/auth/class/usuario';
import { Turno } from 'src/app/class/turno';

@Component({
  selector: 'app-turnos-grid',
  templateUrl: './turnos-grid.component.html',
  styleUrls: ['./turnos-grid.component.scss']
})
export class TurnosGridComponent {

  @Input() turnos: Turno[] = [];
  @Input() currentUser: Usuario = { email: '', password: '' };

  @Output() thowTurno = new EventEmitter();
  
  public filtroEspecialidad: string = '';

  public aplicarFiltro(): void {
    this.turnos = this.turnos.filter((turno: Turno) => {
      const especialidadIncluida = turno.especialidad?.nombre.toLowerCase().includes(this.filtroEspecialidad.toLowerCase());
      const especialistaIncluido = turno.especialista?.nombre?.toLowerCase().includes(this.filtroEspecialidad.toLowerCase());

      return especialidadIncluida || especialistaIncluido;
    });
  }

  public lanzarTurno(turno: Turno) {
    this.thowTurno.emit(turno);
  }
}
