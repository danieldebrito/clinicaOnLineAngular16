import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisPacientesRoutingModule } from './mis-pacientes-routing.module';
import { MisPacientesComponent } from './mis-pacientes.component';
import { ComponentsModule } from '../../../pacientes/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TurnosComponentsModule } from '../../../turnos/components/turnos-components.module';


@NgModule({
  declarations: [
    MisPacientesComponent
  ],
  imports: [
    CommonModule,
    MisPacientesRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    TurnosComponentsModule
  ]
})
export class MisPacientesModule { }
