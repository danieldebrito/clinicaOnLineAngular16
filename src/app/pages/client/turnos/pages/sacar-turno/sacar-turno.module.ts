import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SacarTurnoRoutingModule } from './sacar-turno-routing.module';
import { SacarTurnoComponent } from './sacar-turno.component';
import { TurnosComponentsModule } from '../../components/turnos-components.module';
import { EspecialistaComponentsModule } from 'src/app/pages/client/especialistas/components/especialista-components.module';
import { EspecialidadesModule } from 'src/app/pages/client/especialidades/especialidades.module';

@NgModule({
  declarations: [
    SacarTurnoComponent
  ],
  imports: [
    CommonModule,
    SacarTurnoRoutingModule,
    TurnosComponentsModule,
    EspecialistaComponentsModule,
    EspecialidadesModule
  ]
})
export class SacarTurnoModule { }
