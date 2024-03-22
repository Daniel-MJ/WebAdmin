import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const username = this.username;
    const password = this.password;
    this.authService.login(username, password).subscribe(
      () => {
        console.log('Inicio de sesión exitoso');
        // Redireccionar al usuario a la página principal u otra página autorizada
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error al iniciar sesión:', error);
        // Manejar el error de inicio de sesión (mostrar un mensaje de error, por ejemplo)
      }
    );
  }

}
