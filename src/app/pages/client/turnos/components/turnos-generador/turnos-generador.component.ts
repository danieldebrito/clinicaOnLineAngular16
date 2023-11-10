import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { timestamp } from 'rxjs';
import { Jornada } from 'src/app/class/jornada';
import { EEstadoTurno, Turno } from 'src/app/class/turno';
import { Paciente } from 'src/app/class/usuarios/paciente';
import { turnosService } from 'src/app/services/turnos.service';


@Component({
  selector: 'app-turnos-generador',
  templateUrl: './turnos-generador.component.html',
  styleUrls: ['./turnos-generador.component.scss']
})
export class TurnosGeneradorComponent implements OnChanges {

  @Input() jornadas: Jornada[] = [];
  @Input() especialista: any = {};
  @Input() especialidad: String = '';
  @Input() paciente: Paciente = { email: '', password: '' };

  @Input() turnos: Turno[] = [];
  public turnosGenerados: Turno[] = [];


  @Output() thowTurno = new EventEmitter();

  constructor(private turnosSv: turnosService) { }


  public dias = [
    { dia: 'lunes', numero: 1 },
    { dia: 'martes', numero: 1 },
    { dia: 'miercoles', numero: 1 },
    { dia: 'jueves', numero: 1 },
    { dia: 'viernes', numero: 1 },
    { dia: 'sabado', numero: 1 }
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes["jornadas"] && changes["jornadas"].currentValue) {
      const updatedJornadas: Jornada[] = changes["jornadas"].currentValue;
      this.generateTurnos(updatedJornadas);
    }
  }

  public generateTurnos(jornadas: Jornada[]) {
    jornadas.forEach(element => {
      this.generadorDeTurnos(element);
    });
  }

  public generadorDeTurnos(jornada: any) {
    let turnosGenerados: Turno[] = [];
    let turnosTemp: Turno[] = [];

    // Fecha actual
    const fechaActual = new Date();

    // cuantos intervalos por hora * cantidad de horas de atención
    const cant =
      (60 / jornada.duracionTurno) *
      (jornada.horaFinJornada - jornada.horaInicioJornada);

    // primer semana
    for (let i = 0; i < cant; i++) {
      // quito el domingo (6) y pongo el dia de la jornada en la grilla 0 = lunes, 1 = martes, etc....
      for (let j = 0; j < 7; j++) {
        if (j != 6 && j == jornada.diaDeSemanaEnNumeros) {
          turnosGenerados.push({
            fecha: this.sumarMinuts(i * jornada.duracionTurno + 1440 * j),
            dia: this.getNombreDia(j),
            diahora: this.getFechaHora(this.sumarMinuts(i * jornada.duracionTurno + 1440 * j)),
            especialista: this.especialista,
            especialidad: this.especialidad,
            paciente: this.paciente,
            estado: EEstadoTurno.disponible
          });
        }
      }

      // segunda semana
      for (let j = 7; j < 14; j++) {
        if (j != 13 && j == jornada.diaDeSemanaEnNumeros + 7) {
          turnosGenerados.push({
            fecha: this.sumarMinuts(i * jornada.duracionTurno + 1440 * j),
            dia: this.getNombreDia(jornada.diaDeSemanaEnNumeros),
            diahora: this.getFechaHora(this.sumarMinuts(i * jornada.duracionTurno + 1440 * j)),
            especialista: this.especialista,
            especialidad: this.especialidad,
            paciente: this.paciente,
            estado: EEstadoTurno.disponible
          });
        }
      }

      // tercera semana
      for (let j = 14; j < 21; j++) {
        if (j != 20 && j == jornada.diaDeSemanaEnNumeros + 14) {
          turnosGenerados.push({
            fecha: this.sumarMinuts(i * jornada.duracionTurno + 1440 * j),
            dia: this.getNombreDia(jornada.diaDeSemanaEnNumeros),
            diahora: this.getFechaHora(this.sumarMinuts(i * jornada.duracionTurno + 1440 * j)),
            especialista: this.especialista,
            especialidad: this.especialidad,
            paciente: this.paciente,
            estado: EEstadoTurno.disponible
          });
        }
      }
    }

    this.turnosSv.getItems().subscribe(res => {
      this.turnos = res;

      //filtro los turnos para que me retorne de ahora en mas hasta 21 dias
      turnosTemp = (turnosGenerados.filter(turno => turno.fecha && turno.fecha > fechaActual && (fechaActual.getDay() - turno.fecha.getDay()) < 21))

      // comparo los dos arrays para que me saque los turnos ocupados, si un elemento coincide con un elemento en "diahora" con el array de ocupados no lo muestro
      this.turnosGenerados = turnosTemp.filter(turnoA => !this.turnos.some(turnoB => turnoB.diahora == turnoA.diahora));

      this.turnosGenerados.sort((a: any, b: any) => {
        const fechaA = new Date(a.fecha).getTime();
        const fechaB = new Date(b.fecha).getTime();
        return fechaA - fechaB;
      });

    });
  }

  public getNombreDia(dia: number) {
    let ret: string = '';
    switch (dia) {
      case 0:
        ret = 'Lunes';
        break;
      case 1:
        ret = 'Martes';
        break;
      case 2:
        ret = 'Miercoles';
        break;
      case 3:
        ret = 'Jueves';
        break;
      case 4:
        ret = 'Viernes';
        break;
      case 5:
        ret = 'Sabado';
        break;
      case 6:
        ret = 'Dom';
        break;
      default:
        console.log('No existe!');
        break;
    }
    return ret;
  }

public getFechaHora(date: Date){
  return date.getDate() + '/' + (date.getMonth() + 1) + ' ' +  date.getHours() + ':' + date.getMinutes() + 'hs';
}

  public sumarMinuts(minuts: number) {
    return new Date(this.getMonday(this.getToday()).getTime() + minuts * 60000);
  }

  public getMonday(date: Date) {
    const day = date.getDay() || 7;
    if (day !== 1) {
      date.setHours(-24 * (day - 1));
    }
    // retorno el lunes 8:00 AM
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0);
  }

  public lanzarTurno(turno: Turno) {
    this.thowTurno.emit(turno);
  }

  public getToday() {
    return new Date();
  }
}
