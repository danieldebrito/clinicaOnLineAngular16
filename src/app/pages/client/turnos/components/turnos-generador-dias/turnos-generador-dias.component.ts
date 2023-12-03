import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Jornada } from 'src/app/class/jornada';
import { EEstadoTurno, Turno } from 'src/app/class/turno';
import { Paciente } from 'src/app/class/usuarios/paciente';

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

  @Output() throwTurno = new EventEmitter<Turno>();

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

    // cuantos intervalos por hora * cantidad de horas de atención
    const cant =
      (60 / jornada.duracionTurno) *
      (jornada.horaFinJornada - jornada.horaInicioJornada);

    const today = this.getToday();

    const generarTurnos = async () => {
      for (let i = 0; i < cant; i++) {
        for (let j = 0; j < 16; j++) {
          const fechaTurno = this.sumarMinutos(
            i * jornada.duracionTurno +
              j * 24 * 60 +
              jornada.horaInicioJornada * 60
          );

          if (
            fechaTurno >= today &&
            fechaTurno.getDay() === parseInt(jornada.diaDeSemanaEnNumeros)
          ) {
            turnosGeneradosTemp.push({
              fecha: fechaTurno,
              dia: this.getNombreDia(fechaTurno.getDay()),
              diahora: this.getFechaHora(fechaTurno),
              especialista: this.especialista,
              especialidad: this.especialidad,
              paciente: this.paciente,
              estado: EEstadoTurno.disponible,
            });
          }
        }
      }
    };

    await Promise.resolve(generarTurnos());

    this.turnosGenerados = this.turnosGenerados
      .concat(turnosGeneradosTemp)
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
  }

  public getNombreDia(dia: number) {
    const dias = ['Dom', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dias[dia];
  }

  public getFechaHora(date: Date) {
    return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:${date.getMinutes()}hs`;
  }

  public sumarMinutos(minutos: number) {
    return new Date(this.getMonday(this.getToday()).getTime() + minutos * 60000);
  }

  public getMonday(date: Date) {
    const day = date.getDay() || 7;
    if (day !== 1) {
      date.setHours(-24 * (day - 1));
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0);
  }

  public lanzarTurno(turno: Turno) {
    this.throwTurno.emit(turno);
  }

  public getToday() {
    return new Date();
  }
}
