import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guard/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // auth ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  { path: 'sign-in', loadChildren: () => import('./auth/pages/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: 'sign-up', loadChildren: () => import('./auth/pages/sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: 'forgot-password', loadChildren: () => import('./auth/pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'verify-email', loadChildren: () => import('./auth/pages/verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
  { path: 'selectsingup', loadChildren: () => import('./auth/pages/pre-sign-up/pre-sign-up.module').then(m => m.PreSignUpModule) },
  // pages ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'chat', loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule), canActivate: [AuthGuard] },
  { path: 'error404', loadChildren: () => import('./pages/error404/error404.module').then(m => m.Error404Module) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'denegado', loadChildren: () => import('./pages/denegado/denegado.module').then(m => m.DenegadoModule) },
  // client ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  { path: 'sacarturno', loadChildren: () => import('./pages/client/turnos/pages/sacar-turno/sacar-turno.module').then(m => m.SacarTurnoModule), /*canActivate: [PacienteGuard]*/ },
  { path: 'usuarios', loadChildren: () => import('./pages/client/admin/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'misturnos', loadChildren: () => import('./pages/client/turnos/pages/mis-turnos/mis-turnos.module').then(m => m.MisTurnosModule) },
  { path: 'administrador', loadChildren: () => import('./pages/client/admin/administrador/administrador.module').then(m => m.AdministradorModule) },
  { path: 'especialidades', loadChildren: () => import('./pages/client/especialidades/especialidades.module').then(m => m.EspecialidadesModule) },
  { path: 'jornadas', loadChildren: () => import('./pages/client/especialistas/jornada/jornada.module').then(m => m.JornadaModule) },
  { path: 'denegado', loadChildren: () => import('./pages/denegado/denegado.component').then(m => m.DenegadoComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
