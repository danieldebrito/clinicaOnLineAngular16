import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EEstadoTurno } from 'src/app/class/turno';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turno-card-detalle',
  templateUrl: './turno-card-detalle.component.html',
  styleUrls: ['./turno-card-detalle.component.scss']
})
export class TurnoCardDetalleComponent {
  @Input() turno: any; // Ajusta el tipo de acuerdo a tu estructura de datos
  @Output() throwTurno = new EventEmitter();

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
          return 'badge bg-success';
        case EEstadoTurno.rechazado:
          return 'badge bg-danger';
          case EEstadoTurno.cancelado:
            return 'badge bg-danger';
        // Agrega casos para otros estados según sea necesario
        default:
          return 'badge bg-secondary';
      }
    }
    return 'badge bg-secondary'; // Puedes ajustar el valor predeterminado según tus necesidades
  }

  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.showCommentDialog(); // Llama a la función para mostrar el cuadro de diálogo del comentario
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Turno cancellation cancelled.)', 'error');
      }
    });
  }

  showCommentDialog() {
    Swal.fire({
      title: 'Leave a Comment',
      input: 'text',
      inputPlaceholder: 'Enter your comment here...',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter a comment!';
        }
        return '';
      },
    }).then((result) => {
      if (result.isConfirmed) {

        this.turno.motivoRechazo = result.value;
        this.turno.estado = EEstadoTurno.cancelado;

        this.throwTurno.emit(this.turno);

        //console.log('Comment submitted:', result.value);


        // Aquí puedes enviar el comentario a tu servicio o hacer lo que necesites con él
        Swal.fire('Comment Submitted!', 'Your comment has been submitted.', 'success');
      }
    });
  }
}
