import { Component, Input } from '@angular/core';
import { Especialista } from 'src/app/class/usuarios/especialista';

@Component({
  selector: 'app-especialista-card',
  templateUrl: './especialista-card.component.html',
  styleUrls: ['./especialista-card.component.scss']
})
export class EspecialistaCardComponent {

  @Input() especialista: any = { };

}
