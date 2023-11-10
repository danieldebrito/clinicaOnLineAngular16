import { Encuesta } from './encuesta';
import { Especialista } from './usuarios/especialista';
import { Paciente } from './usuarios/paciente';

export class Turno {
    constructor(
        public id?: String,
        public fecha?: Date,
        public dia?: String,
        public hora?: Number,
        public diahora?: String,
        public especialista?: Especialista,
        public paciente?: Paciente,
        public especialidad?: String,
        public estado?: EEstadoTurno,
        public motivoRechazo?: string,
        public encuesta?: Encuesta,
    ) { }
}


export enum EEstadoTurno {
    aceptado = 'aceptado',
    rechazado = 'recahazado',
    cumplido = 'cumplido',
    anulado = 'anulado',
    ocupado = 'ocupado',
    disponible = 'disponible'
}
