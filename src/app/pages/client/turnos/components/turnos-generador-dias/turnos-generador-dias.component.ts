import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { timestamp } from 'rxjs';
import { Jornada } from 'src/app/class/jornada';
import { EEstadoTurno, Turno } from 'src/app/class/turno';
import { Paciente } from 'src/app/class/usuarios/paciente';
import { turnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turnos-generador-dias',
  templateUrl: './turnos-generador-dias.component.html',
  styleUrls: ['./turnos-generador-dias.component.scss'],
})
export class TurnosGeneradorDiasComponent {
  @Input() jornadas: Jornada[] = [];
  @Input() especialista: any = {};
  @Input() especialidad: string = '';
  @Input() paciente: Paciente = { email: '', password: '' };

  @Input() turnos: Turno[] = [];
  public turnosGenerados: Turno[] = [];
  public turnosGeneradosDias: any[] = [];

  @Output() thowTurno = new EventEmitter();

  constructor(private turnosSv: turnosService) {}

  public dias = [
    { dia: 'lunes', numero: 1 },
    { dia: 'martes', numero: 1 },
    { dia: 'miercoles', numero: 1 },
    { dia: 'jueves', numero: 1 },
    { dia: 'viernes', numero: 1 },
    { dia: 'sabado', numero: 1 },
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['jornadas'] && changes['jornadas'].currentValue) {
      const updatedJornadas: Jornada[] = changes['jornadas'].currentValue;
      this.generateTurnos(updatedJornadas);
    }
  }

  public generateTurnos(jornadas: Jornada[]) {
    jornadas.forEach((element) => {
      this.generadorDeTurnos(element);
    });
  }

  public async generadorDeTurnos(jornada: any) {

    let turnosGeneradosTemp: Turno[] = [];
    this.turnosGenerados = [];

    // cuantos intervalos por hora * cantidad de horas de atención
    const cant =
      (60 / jornada.duracionTurno) *
      (jornada.horaFinJornada - jornada.horaInicioJornada);

    // Crear una función que retorna una promesa y envuelve los ciclos for
    const generarTurnos = async () => {
      // primer semana
      for (let i = 0; i < cant; i++) {
        for (let j = 0; j < 7; j++) {
          if (j != 6 && j == parseInt(jornada.diaDeSemanaEnNumeros)) {
            turnosGeneradosTemp.push({
              fecha: this.sumarMinuts(i * jornada.duracionTurno + 1440 * j),
              dia: this.getNombreDia(j),
              diahora: this.getFechaHora(
                this.sumarMinuts(i * jornada.duracionTurno + 1440 * j)
              ),
              especialista: this.especialista,
              especialidad: this.especialidad,
              paciente: this.paciente,
              estado: EEstadoTurno.disponible,
            });
          }
        }
      }

      // segunda semana
      for (let i = 0; i < cant; i++) {
        for (let j = 7; j < 13; j++) {
          if (j != 13 && j == parseInt(jornada.diaDeSemanaEnNumeros) + 7) {
            turnosGeneradosTemp.push({
              fecha: this.sumarMinuts(i * jornada.duracionTurno + 1440 * j),
              dia: this.getNombreDia(parseInt(jornada.diaDeSemanaEnNumeros)),
              diahora: this.getFechaHora(
                this.sumarMinuts(i * jornada.duracionTurno + 1440 * j)
              ),
              especialista: this.especialista,
              especialidad: this.especialidad,
              paciente: this.paciente,
              estado: EEstadoTurno.disponible,
            });
          }
        }
      }

      // tercera semana
      for (let i = 0; i < cant; i++) {
        for (let j = 14; j < 20; j++) {
          if (j != 20 && j == parseInt(jornada.diaDeSemanaEnNumeros) + 14) {
            turnosGeneradosTemp.push({
              fecha: this.sumarMinuts(i * jornada.duracionTurno + 1440 * j),
              dia: this.getNombreDia(parseInt(jornada.diaDeSemanaEnNumeros)),
              diahora: this.getFechaHora(
                this.sumarMinuts(i * jornada.duracionTurno + 1440 * j)
              ),
              especialista: this.especialista,
              especialidad: this.especialidad,
              paciente: this.paciente,
              estado: EEstadoTurno.disponible,
            });
          }
        }
      }
    };

    // Esperar a que la función que genera turnos termine
    await Promise.resolve(generarTurnos());

    // concatenamos los turnos de cada una de las jornadas
    this.turnosGenerados = this.turnosGenerados.concat(turnosGeneradosTemp);
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

  public getFechaHora(date: Date) {
    return (
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      'hs'
    );
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
