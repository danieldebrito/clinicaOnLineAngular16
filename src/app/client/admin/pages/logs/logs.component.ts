import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserLog } from 'src/app/auth/class/userLog';
import { LogUserService } from 'src/app/auth/services/log-user.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  providers: [DatePipe], // Agrega DatePipe a los proveedores del componente
})
export class LogsComponent implements OnInit {
  public logs: UserLog[] = [];

  constructor(private logsSv: LogUserService, private datePipe: DatePipe) {}

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
