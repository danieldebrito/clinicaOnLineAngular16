import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TurnoDay } from 'src/app/class/turnoDay';

@Component({
  selector: 'app-turno-card-dia',
  templateUrl: './turno-card-dia.component.html',
  styleUrls: ['./turno-card-dia.component.scss'],
})
export class TurnoCardDiaComponent {
  @Input() turnoDia: TurnoDay = {};
}
