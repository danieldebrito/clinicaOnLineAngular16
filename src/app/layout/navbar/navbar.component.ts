import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject, takeUntil } from 'rxjs';
import { ERole, Usuario } from 'src/app/auth/class/usuario';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {

  public currentUser: Usuario = { email: '', password: '' };
  private unsubscribe$ = new Subject<void>();

  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    private usuariosSv: UsuariosService,
    private ngZone: NgZone  // Agrega el servicio NgZone
  ) {
    this.subscribeToUserLoggedOut();
  }

  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemById(user.uid).subscribe((res) => {
          this.currentUser = res;
        });
      } else {
        this.currentUser = { email: '', password: '' };
      }
    });
  }

  private subscribeToUserLoggedOut() {
    this.authService.userLoggedOut$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        // Utiliza ngZone.run para asegurar que la actualización del estado del usuario esté dentro del contexto de Angular
        this.ngZone.run(() => {
          // Limpiar el estado del usuario al cerrar sesión
          this.currentUser = { email: '', password: '', role: ERole.publico };
        });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }
}
