import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador.component';

const routes: Routes = [
  {
    path: '',
    component: AdministradorComponent,
    children: [
      { path: 'usuarios', loadChildren: () => import('src/app/pages/client/admin/usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'especialidades', loadChildren: () => import('src/app/pages/client/especialidades/especialidades.module').then(m => m.EspecialidadesModule) },

      /*
      { path: 'pedidos', component: PedidosAdminComponent },
      { path: 'descuentos', component: DescuentosComponent },
      { path: 'archivos', component: ArchivosComponent },
      { path: 'usuarios', loadChildren: () => import('src/app/web/admin/pages/usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'productos', loadChildren: () => import('src/app/web/admin/pages/productos/productos.module').then(m => m.ProductosModule) },
      { path: 'altausuarios', loadChildren: () => import('src/app/_auth/pages/auth/users-create/users-create.module').then(m => m.UsersCreateModule) }
      */
    ],
  },
  // { path: 'archivos', component: ArchivosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
