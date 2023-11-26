import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SacarTurnoRoutingModule } from './sacar-turno-routing.module';
import { SacarTurnoComponent } from './sacar-turno.component';
import { TurnosComponentsModule } from '../../components/turnos-components.module';
import { EspecialistaComponentsModule } from 'src/app/pages/client/especialistas/components/especialista-components.module';
import { EspecialidadesModule } from 'src/app/pages/client/especialidades/especialidades.module';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    SacarTurnoComponent
  ],
  imports: [
    CommonModule,
    SacarTurnoRoutingModule,
    TurnosComponentsModule,
    EspecialistaComponentsModule,
    EspecialidadesModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SacarTurnoModule { }
