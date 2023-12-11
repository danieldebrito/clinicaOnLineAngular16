import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EEstadoTurno, Turno } from 'src/app/class/turno';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { turnosService } from 'src/app/services/turnos.service';
import { Usuario } from 'src/app/auth/class/usuario';

@Component({
  selector: 'app-turno-card-detalle',
  templateUrl: './turno-card-detalle.component.html',
  styleUrls: ['./turno-card-detalle.component.scss'],
})
export class TurnoCardDetalleComponent {
  @Input() turno: any = {}; // Ajusta el tipo de acuerdo a tu estructura de datos
  @Input() currentUser: Usuario = { email: '', password: ''}; // Ajusta el tipo de acuerdo a tu estructura de datos

  @Output() throwTurno = new EventEmitter();

  constructor(private router: Router, private turnosSv: turnosService) {}

  getFormattedDate(): string {
    if (this.turno && this.turno.fecha && this.turno.fecha.toDate) {
      const date = this.turno.fecha.toDate();
      return date.toISOString();
    }
    return '';
  }

  getBadgeClass(): string {
    if (this.turno && this.turno.estado) {
      switch (this.turno.estado) {
        case EEstadoTurno.aceptado:
          return 'badge bg-primary';
        case EEstadoTurno.cancelado:
          return 'badge bg-danger';
          case EEstadoTurno.cumplido:
            return 'badge bg-success';
        default:
          return 'badge bg-secondary';
      }
    }
    return 'badge bg-secondary'; // Puedes ajustar el valor predeterminado según tus necesidades
  }

  public cambiarEstadoTurno(estado: string) {
    switch (estado) {
      case 'aceptado':
        this.turno.estado = EEstadoTurno.aceptado;
        break;
      case 'cumplido':
        this.turno.estado = EEstadoTurno.cumplido;
        break;
      case 'cancelado':
        this.turno.estado = EEstadoTurno.cancelado;
        break;
      case 'pendiente':
        this.turno.estado = EEstadoTurno.pendiente;
        break;
      case 'disponible':
        this.turno.estado = EEstadoTurno.disponible;
        break;
      default:
        break;
    }
    this.throwTurno.emit(this.turno);
  }

  //////  model alerta para cancelar turno /////////////////////////////////////////////////////////////////
  alertaConfirmacion() {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Este proceso es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, de acuerdo.',
      cancelButtonText: 'No, déjame pensar.',
    }).then((resultado) => {
      if (resultado.value) {
        this.mostrarDialogoComentario(); // Llama a la función para mostrar el cuadro de diálogo del comentario
      } else if (resultado.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Cancelación realizada con éxito.', 'error');
      }
    });
  }

  mostrarDialogoComentario() {
    Swal.fire({
      title: 'Por favor, comente por qué cancela su turno',
      input: 'text',
      inputPlaceholder: 'Ingrese el comentario aquí...',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      inputValidator: (valor) => {
        if (!valor) {
          return 'Por favor, ingrese un comentario.';
        }
        return '';
      },
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        // cambio estado al turno
        this.turno.motivoRechazo = resultado.value;
        this.cambiarEstadoTurno('cancelado');

        Swal.fire(
          '¡Comentario enviado!',
          'Su comentario ha sido enviado.',
          'success'
        );
      }
    });
  }

  public atenderTurno(turno: Turno) {
    this.turnosSv.turnoPaciente = turno.paciente;
    this.turnosSv.turnoAtencion = turno;

    this.router.navigate(['/atenderturno']);
  }

  public verHistoriaClinica(turno: Turno) {
    this.turnosSv.turnoPaciente = turno.paciente;
    this.turnosSv.turnoAtencion = turno;

    this.router.navigate(['/historiaclinica']);
  }
}
