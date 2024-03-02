import { Component } from '@angular/core';
import { ApiService } from '../apirestlet.service';
import { Insputssearch } from '../insputssearch';

@Component({
  selector: 'app-manageActivities',
  templateUrl: './manageActivities.component.html',
  styleUrl: './manageActivities.component.css'
})
export class manageActivitiesComponent {
  title = "Gestion de Actividades"

  titulo: String = "";
  tipo: String = "";
  fechaInicio: String = "";
  fechaFinal: String = "";
  horaInicio: String = "";
  horaFinal: String = "";
  ponente: String[] = [];
  organizador: String[] = [];
  lugar: String = "";
  limiteAsistentes: String = ""; 
  enlaceInformacion: String = "";
  enlaceInscripcion: String = "";
  descripcion: String = "";
  categoria: String[] = [];
  mensajeRespuesta: string = '';
  deleteActivity: string = "";
  actividades: Insputssearch[] = [];

  showInputs: boolean = false;
  showInputs1: boolean = false;
  showInputs2: boolean = false;

  constructor(private apiService: ApiService) {}

  toggleInputs() {
    this.showInputs = !this.showInputs;
  }

  toggleInputs1() {
    this.showInputs1 = !this.showInputs1;
  }

  toggleInputs2() {
    this.showInputs2 = !this.showInputs2;
  }

  CreateActivities() {
    const titulo = this.titulo; // Reemplaza esto con el usuario recogido
    const tipo = this.tipo;
    const fechaInicio = this.fechaInicio;
    const fechaFinal = this.fechaFinal;
    const horaInicio = this.horaInicio;
    const horaFinal = this.horaFinal;
    const ponente = this.ponente;
    const organizador = this.organizador;
    const lugar = this.lugar;
    const limiteAsistentes = this.limiteAsistentes;
    const enlaceInformacion = this.enlaceInformacion;
    const enlaceInscripcion = this.enlaceInscripcion;
    const descripcion = this.descripcion;
    const categoria = this.categoria;

    this.apiService.postActivities(titulo,tipo,fechaInicio,fechaFinal,horaInicio,horaFinal,ponente,organizador,lugar,limiteAsistentes,enlaceInformacion,enlaceInscripcion,descripcion,categoria)
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

  ModifyActivities() {
    const titulo = this.titulo; // Reemplaza esto con el usuario recogido
    const tipo = this.tipo;
    const fechaInicio = this.fechaInicio;
    const fechaFinal = this.fechaFinal;
    const horaInicio = this.horaInicio;
    const horaFinal = this.horaFinal;
    const ponente = this.ponente;
    const organizador = this.organizador;
    const lugar = this.lugar;
    const limiteAsistentes = this.limiteAsistentes;
    const enlaceInformacion = this.enlaceInformacion;
    const enlaceInscripcion = this.enlaceInscripcion;
    const descripcion = this.descripcion;
    const categoria = this.categoria;

    this.apiService.putActivities(titulo,tipo,fechaInicio,fechaFinal,horaInicio,horaFinal,ponente,organizador,lugar,limiteAsistentes,enlaceInformacion,enlaceInscripcion,descripcion,categoria)
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

  DeleteActivities() {
    const deleteActivity = this.deleteActivity; // Reemplaza esto con el usuario recogido

    this.apiService.deleteActivities(deleteActivity)
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

  buscarTodasActividades() {

    this.apiService.getAllActividades()
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
    
}
