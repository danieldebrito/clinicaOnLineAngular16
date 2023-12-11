import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';
import { turnosService } from 'src/app/services/turnos.service';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/class/usuarios/paciente';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  public usuarios: any;

  constructor(
    private usuariosSvc: UsuariosService,
    private turnosSv: turnosService,
    private router: Router
  ) {}

  public getUsuarios() {
    this.usuariosSvc.getItems().subscribe((res) => {
      this.usuarios = res;
      console.table(res);
    });
  }

  public deleteUsuario(usuario: any) {
    this.usuariosSvc.delete(usuario.id);
    this.getUsuarios();
  }

  public verHistoriaClinica(paciente: Paciente) {
    this.turnosSv.turnoPaciente = paciente;
    this.router.navigate(['/historiaclinica']);
  }

  ngOnInit(): void {
    this.getUsuarios();
  }
}
