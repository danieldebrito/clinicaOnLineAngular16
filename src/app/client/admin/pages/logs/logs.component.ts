import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserLog } from 'src/app/auth/class/userLog';
import { LogUserService } from 'src/app/auth/services/log-user.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  providers: [DatePipe], // Agrega DatePipe a los proveedores del componente
})
export class LogsComponent implements OnInit {
  public logs: UserLog[] = [];

  constructor(private logsSv: LogUserService, private datePipe: DatePipe) {}

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.logs.map(log => ({
      Usuario: log.usuario.email,
      Fecha: this.getFormattedDate(log)
    })));
  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Logs de Usuarios');
  
    XLSX.writeFile(wb, 'logs_usuarios.xlsx');
  }

  public getLogs() {
    this.logsSv.getItems().subscribe((res) => {
      this.logs = res;
      console.table(this.logs);
    });
  }


  getFormattedDate(log: UserLog): string {
    const date = log.fechaIngreso.toDate();
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss'); // Ajusta el formato según tus necesidades
  }

  ngOnInit(): void {
    this.getLogs();
  }
}
