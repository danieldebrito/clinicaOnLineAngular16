import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';
import { turnosService } from 'src/app/services/turnos.service';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/class/usuarios/paciente';
import * as XLSX from 'xlsx';

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

  public exportToExcel() {
    const data: any[] = [];
    this.usuarios.forEach((item: any) => {
      data.push({
        Nombre: `${item.nombre} ${item.apellido}`,
        Rol: item.role,
        Nacimiento: item.fechaNacimiento,
        Email: item.email,
        'Email Verificado': item.emailVerified ? 'Verificado' : 'Sin Verificar',
        Estado: item.habilitado ? 'Habilitado' : 'Deshabilitado',
      });
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');

    // Guardar el archivo
    XLSX.writeFile(wb, 'usuarios.xlsx');
  }
  
  ngOnInit(): void {
    this.getUsuarios();
  }
}
