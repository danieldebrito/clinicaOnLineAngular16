import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Especialidad } from 'src/app/class/especialidad';

@Component({
  selector: 'app-especialistas-grid',
  templateUrl: './especialistas-grid.component.html',
  styleUrls: ['./especialistas-grid.component.scss']
})
export class EspecialistasGridComponent {

  @Input() especialistas: Especialidad[] = [];
  @Output() itemSel = new EventEmitter();

  public lanzarEspecialidad(especialidad: any) {
    this.itemSel.emit(especialidad);
  }

}
