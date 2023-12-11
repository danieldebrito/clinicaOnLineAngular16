import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { EEstadoTurno, Turno } from 'src/app/class/turno';
import { Paciente } from 'src/app/class/usuarios/paciente';
import { turnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss'],
})
export class HistoriaClinicaComponent implements OnInit {
  public paciente: Paciente = { email: '', password: '' };
  public turnosPaciente: Turno[] = [];

  constructor(private turnosSv: turnosService) {
    // Check if turnoPaciente is defined before accessing its properties
    if (this.turnosSv.turnoPaciente && this.turnosSv.turnoPaciente.paciente) {
      this.paciente = this.turnosSv.turnoPaciente.paciente;
    }
  }

  ngOnInit(): void {
    this.turnosSv.getItems().subscribe((res) => {
      const turnos: Turno[] = res;

      // Check if turnoPaciente is defined before accessing its properties
      if (this.turnosSv.turnoPaciente && this.turnosSv.turnoPaciente.paciente) {
        this.turnosPaciente = turnos.filter(
          (e) => e.paciente.uid == this.turnosSv.turnoPaciente.paciente.uid
          && e.estado == EEstadoTurno.cumplido
        );
      }

      console.table(this.paciente);
      console.table(this.turnosPaciente);
    });
  }
}
