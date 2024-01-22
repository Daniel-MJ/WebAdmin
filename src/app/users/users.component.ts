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
  selectedCategoria: string = "";
  title = 'Busqueda Por Parametros.';
  fechaInicial: string = "";
  fechaFinal: string = "";
  actividades: Insputssearch[] = [];
  lugar: string = "";
  categoria: string = ""

  constructor(private apiService: ApiService) {}

  buscarActividadesPorFecha() {
    const fechaInicio = this.fechaInicial // Reemplaza esto con la fecha recogida
    const fechaFinal = this.fechaFinal; // Reemplaza esto con la fecha recogida


    this.apiService.getActividadesPorFecha(fechaInicio, fechaFinal)
      .subscribe(
        (actividades: Insputssearch[]) => {
          // Manejar las actividades devueltas
          this.actividades = actividades;
        },
        (error: any) => {
          // Manejar el error si es necesario
          console.error('Error al obtener actividades:', error);
        }
      );

  }

  buscarActividadesPorLugar() {
    const lugar = this.lugar // Reemplaza esto con el lugar recogido

    this.apiService.getActividadesPorLugar(lugar)
      .subscribe((actividades: Insputssearch[]) => {
        // Manejar las actividades devueltas
        this.actividades = actividades;
      },
      (error: any) => {
        // Manejar el error si es necesario
        console.error('Error al obtener actividades:', error);
      }
    );
  }

  buscarActividadesPorCategoria() {
    const categoria = this.selectedCategoria // Reemplaza esto con la categoria recogida

    this.apiService.getActividadesPorCategoria(categoria)
      .subscribe((actividades: Insputssearch[]) => {
        // Manejar las actividades devueltas
        this.actividades = actividades;
      },
      (error: any) => {
        // Manejar el error si es necesario
        console.error('Error al obtener actividades:',error);
      }
    );
  }
}
