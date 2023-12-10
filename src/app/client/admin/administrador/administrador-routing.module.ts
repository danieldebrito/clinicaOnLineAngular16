import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador.component';

const routes: Routes = [
  {
    path: '',
    component: AdministradorComponent,
    children: [
      { path: 'usuarios', loadChildren: () => import('src/app/client/admin/usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'especialidades', loadChildren: () => import('src/app/client/especialidades/especialidades.module').then(m => m.EspecialidadesModule) },
    ],
  },
  // { path: 'archivos', component: ArchivosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
