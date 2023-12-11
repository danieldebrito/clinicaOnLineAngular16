import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Turno } from 'src/app/class/turno';
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
    this.paciente = this.turnosSv.turnoPaciente.paciente;
  }

  

  ngOnInit(): void {
    this.turnosSv.getItems()
      .pipe(
        switchMap(turnos => {
          this.turnosPaciente = turnos.filter(e => e.paciente && (e.paciente.uid == this.turnosSv.turnoPaciente.paciente.uid));
          console.table(this.turnosPaciente);
          return []; // You can return an observable here if needed
        })
      )
      .subscribe();
  }
  
  
}
