import { Component } from '@angular/core';
import { ApiService } from '../apirestlet.service';
import { Insputssearch } from '../insputssearch';
import { ActividadComponent } from '../activities/activities.component';

@Component({
  selector: 'users-search',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  title = 'Gestion de Usuarios.';
 // actividades: Insputssearch[] = [];
  user: string = "";
  pass: string = "";
  deleteUser: string ="";
  mensajeRespuesta: string = '';

  constructor(private apiService: ApiService) {}


  CreateUser() {
    const user = this.user; // Reemplaza esto con el usuario recogido
    const pass = this.pass;
    this.apiService.postUser(user,pass)
      .subscribe((respuesta: string) => {
        // Manejar las actividades devueltas
        this.mensajeRespuesta = respuesta;
      },
      (error: any) => {
        // Manejar el error si es necesario
        console.error('Error al crear usuario:', error);
      }
    );
  }
  DeleteUser() {
    const  deleteUser = this. deleteUser; // Reemplaza esto con el usuario recogido

    this.apiService.deleteUser(deleteUser)
      .subscribe((respuesta: string) => {
        // Manejar las actividades devueltas
        this.mensajeRespuesta = respuesta;
      },
      (error: any) => {
        // Manejar el error si es necesario
        console.error('Error al eliminar usuario:', error);
      }
    );
  }
}
