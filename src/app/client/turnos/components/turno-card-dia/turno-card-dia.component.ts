import { Component, Input, Output } from '@angular/core';
import { Turno } from 'src/app/class/turno';
import { TurnoDay } from 'src/app/class/turnoDay';

@Component({
  selector: 'app-turno-card-dia',
  templateUrl: './turno-card-dia.component.html',
  styleUrls: ['./turno-card-dia.component.scss'],
})
export class TurnoCardDiaComponent {
  public turnosGenerados: Turno[] = [];


  @Input() turnoDia: TurnoDay = {};

}
