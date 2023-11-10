import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Especialidad } from 'src/app/class/especialidad';

@Component({
  selector: 'app-especialidades-grid',
  templateUrl: './especialidades-grid.component.html',
  styleUrls: ['./especialidades-grid.component.scss']
})
export class EspecialidadesGridComponent {

  @Input() especialidades: String[] = [];
  @Output() especialidadSeleccionada = new EventEmitter();

  public lanzarEspecialidad(especialidad: String) {
    this.especialidadSeleccionada.emit(especialidad);
  }

}
