import { Component, Input } from '@angular/core';
import { Paciente } from 'src/app/class/usuarios/paciente';

@Component({
  selector: 'app-paciente-card',
  templateUrl: './paciente-card.component.html',
  styleUrls: ['./paciente-card.component.scss']
})
export class PacienteCardComponent {
  @Input() paciente: Paciente = { email: '', password: '' };

}

