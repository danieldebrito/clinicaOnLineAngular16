import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/class/turno';
import { turnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-atender-turno',
  templateUrl: './atender-turno.component.html',
  styleUrls: ['./atender-turno.component.scss']
})
export class AtenderTurnoComponent implements OnInit {

  public turno: any = {};

  constructor( private turnosSv: turnosService ){}


  getFormattedDate(): string {
    if (this.turno && this.turno.fecha && this.turno.fecha.toDate) {
      const date = this.turno.fecha.toDate();
      return date.toISOString();
    }
    return '';
  }



  ngOnInit() {
    this.turno = this.turnosSv.turnoAtender;

    console.log(this.turno);
  }

}
