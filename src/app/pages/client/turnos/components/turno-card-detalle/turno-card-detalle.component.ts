import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-turno-card-detalle',
  templateUrl: './turno-card-detalle.component.html',
  styleUrls: ['./turno-card-detalle.component.scss']
})
export class TurnoCardDetalleComponent {
  @Input() turno: any; // Ajusta el tipo de acuerdo a tu estructura de datos

  getFormattedDate(): string {
    if (this.turno && this.turno.fecha && this.turno.fecha.toDate) {
      const date = this.turno.fecha.toDate(); // Convierte el objeto Timestamp a un objeto Date
      return date.toISOString(); // Puedes ajustar el formato según tus necesidades
    }
    return '';
  }
}

