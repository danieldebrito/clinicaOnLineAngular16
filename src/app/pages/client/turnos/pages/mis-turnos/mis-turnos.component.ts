import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/class/turno';
import { turnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  public turnos: Turno[] = [];

  constructor( private turnosSv: turnosService ){}

  public buscador(palabraClave: string){
    console.log(palabraClave);
  }

  public turnoUpdate(turno: Turno){

    console.log(turno);

    this.turnosSv.update(turno.id, turno);
  }

ngOnInit(): void {
  this.turnosSv.getItems().subscribe( res => {
    this.turnos = res;
    console.log(res);
  });
}
}
