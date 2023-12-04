import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { TurnosGridComponent } from './turnos-grid/turnos-grid.component';
import { TurnoDetalleComponent } from './turno-detalle/turno-detalle.component';
import { EspecialidadesModule } from '../../especialidades/especialidades.module';
import { EspecialistaComponentsModule } from '../../especialistas/components/especialista-components.module';
import { FormsModule } from '@angular/forms';
import { TurnosGeneradorDiasComponent } from './turnos-generador-dias/turnos-generador-dias.component';
import { TurnoCardDiaComponent } from './turno-card-dia/turno-card-dia.component';
import { TurnosListadoComponent } from './turnos-listado/turnos-listado.component';
import { TurnoCardComponent } from './turno-card/turno-card.component';

@NgModule({
  declarations: [
    BarraBusquedaComponent,
    TurnosGridComponent,
    TurnoDetalleComponent,
    TurnosGeneradorDiasComponent,
    TurnoCardDiaComponent,
    TurnosListadoComponent,
    TurnoCardComponent
  ],
  imports: [
    CommonModule,
    EspecialistaComponentsModule,
    EspecialidadesModule,
    FormsModule
  ],
  exports: [
    BarraBusquedaComponent,
    TurnosGridComponent,
    TurnoDetalleComponent,
    TurnosGeneradorDiasComponent,
    TurnosListadoComponent
  ]
})
export class TurnosComponentsModule { }
