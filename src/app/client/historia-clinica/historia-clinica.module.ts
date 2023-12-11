import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriaClinicaRoutingModule } from './historia-clinica-routing.module';
import { HistoriaClinicaComponent } from './historia-clinica.component';
import { ComponentsModule } from '../pacientes/components/components.module';


@NgModule({
  declarations: [
    HistoriaClinicaComponent
  ],
  imports: [
    CommonModule,
    HistoriaClinicaRoutingModule,
    ComponentsModule
  ]
})
export class HistoriaClinicaModule { }
