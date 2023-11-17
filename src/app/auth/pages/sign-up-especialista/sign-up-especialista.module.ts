import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpEspecialistaRoutingModule } from './sign-up-especialista-routing.module';
import { SignUpEspecialistaComponent } from './sign-up-especialista.component';


@NgModule({
  declarations: [
    SignUpEspecialistaComponent
  ],
  imports: [
    CommonModule,
    SignUpEspecialistaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SignUpEspecialistaModule { }
