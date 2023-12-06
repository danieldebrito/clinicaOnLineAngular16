import { Encuesta } from './encuesta';
import { Especialidad } from './especialidad';
import { Especialista } from './usuarios/especialista';
import { Paciente } from './usuarios/paciente';

export class Turno {
    constructor(
        public id?: string,
        public fecha?: Date,
        public dia?: string,
        public especialista?: Especialista,
        public paciente?: Paciente,
        public especialidad?: Especialidad,
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
