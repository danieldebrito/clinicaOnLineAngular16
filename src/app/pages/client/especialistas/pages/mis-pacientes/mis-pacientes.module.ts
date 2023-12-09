import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisPacientesRoutingModule } from './mis-pacientes-routing.module';
import { MisPacientesComponent } from './mis-pacientes.component';
import { ComponentsModule } from '../../../pacientes/components/components.module';


@NgModule({
  declarations: [
    MisPacientesComponent
  ],
  imports: [
    CommonModule,
    MisPacientesRoutingModule,
    ComponentsModule
  ]
})
export class MisPacientesModule { }
