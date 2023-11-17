import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpPacienteRoutingModule } from './sign-up-paciente-routing.module';
import { SignUpPacienteComponent } from './sign-up-paciente.component';


@NgModule({
  declarations: [
    SignUpPacienteComponent
  ],
  imports: [
    CommonModule,
    SignUpPacienteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SignUpPacienteModule { }
