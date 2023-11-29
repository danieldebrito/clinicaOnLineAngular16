import { Component, Input } from '@angular/core';
import { Turno } from 'src/app/class/turno';

@Component({
  selector: 'app-turno-card-dia',
  templateUrl: './turno-card-dia.component.html',
  styleUrls: ['./turno-card-dia.component.scss'],
})
export class TurnoCardDiaComponent {
  @Input() turno: Turno = {};
}
