import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriaClinicaRoutingModule } from './historia-clinica-routing.module';
import { HistoriaClinicaComponent } from './historia-clinica.component';
import { ComponentsModule } from '../pacientes/components/components.module';
import { EspecialistaComponentsModule } from '../especialistas/components/especialista-components.module';



@NgModule({
  declarations: [
    HistoriaClinicaComponent
  ],
  imports: [
    CommonModule,
    HistoriaClinicaRoutingModule,
    ComponentsModule,
    EspecialistaComponentsModule
  ]
})
export class HistoriaClinicaModule { }
