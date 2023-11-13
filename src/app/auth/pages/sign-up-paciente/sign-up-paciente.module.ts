import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpPacienteRoutingModule } from './sign-up-paciente-routing.module';
import { SignUpPacienteComponent } from './sign-up-paciente.component';


@NgModule({
  declarations: [
    SignUpPacienteComponent
  ],
  imports: [
    CommonModule,
    SignUpPacienteRoutingModule
  ]
})
export class SignUpPacienteModule { }
