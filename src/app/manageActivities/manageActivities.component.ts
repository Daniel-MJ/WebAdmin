import { Component, ViewChild, ChangeDetectorRef, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '../apirestlet.service';
import { Insputssearch } from '../insputssearch';
import { MatPaginator, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manageActivities',
  templateUrl: './manageActivities.component.html',
  styleUrl: './manageActivities.component.css'
})

export class manageActivitiesComponent implements OnInit {
  title = "Gestion de Actividades"

  titulo: String = "";
  tipo: String = "";
  fechaInicio: string = "";
  fechaFinal: string = "";
  horaInicio: string = "";
  horaFinal: string = "";
  ponente: string[] = [];
  organizador: string[] = [];
  lugar: String = "";
  limiteAsistentes: String = ""; 
  enlaceInformacion: String = "";
  enlaceInscripcion: String = "";
  descripcion: String = "";
  categoria: string[] = [];
  mensajeRespuesta: string = '';
  deleteActivity: string = "";
  actividades: Insputssearch[] = [];
  actividadSeleccionada: Insputssearch | null = null;
  totalActividades: number = 0;
  filtroFechaInicio: string = "";
  filtroFechaFinal: string = "";
  filtroLugar: string = "";
  filtroPonente: string[] = [];
  filtroOrganizador: string[] = [];
  filtroCategoria: string[] = [];
  selectedTemplate: string = "";
  showInputs: boolean = false;
  showInputs1: boolean = false;
  showInputs2: boolean = false;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private http: HttpClient) {
    //this.paginator = new MatPaginator(new MatPaginatorIntl(), this.cdr.detectChanges());
  }

  ngOnInit(): void {
    this.buscarTodasActividades();
  }

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
    const deleteActivity =this.deleteActivity; // Reemplaza esto con el usuario recogido

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


    // Propiedad para el paginador
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    // Método para manejar el cambio de página
    onPageChange(event: PageEvent) {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      this.buscarTodasActividades();
    }

    aplicarFiltro() {
      // Aquí simplemente actualizamos los valores de filtroFechaInicio y filtroFechaFinal
      // Cuando estos valores cambian, Angular se encargará automáticamente de aplicar el filtro gracias al binding de datos bidireccional
      this.buscarTodasActividades();
    }
  
    limpiarFiltros() {
      // Para limpiar los filtros, simplemente restablecemos los valores a una cadena vacía
      this.filtroFechaInicio = "";
      this.filtroFechaFinal = "";
      this.filtroLugar = "";
      this.filtroPonente = [];
      this.filtroOrganizador = [];
      this.filtroCategoria = [];
      // Aplicamos de nuevo el filtro para mostrar todas las actividades
      this.buscarTodasActividades();
    }

    seleccionarActividad(actividad: Insputssearch) {
      this.actividadSeleccionada = actividad;
      this.deleteActivity = actividad.titulo;
      this.showInputs1 = true;
    }
    
    cerrarFormulario() {
      this.actividadSeleccionada = null;
    }

    isArray(actividad: any): boolean {
      return Array.isArray(actividad.ponente);
    }

    confirmDelete() {
      if (confirm("¿Estás seguro de que quieres eliminar esta actividad?")) {
        this.DeleteActivities();
      }
    }

    exportActivities() {
      // Obtener las actividades actuales de la tabla
      const activitiesToExport = this.actividades.slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize);
    
      // Verificar la plantilla seleccionada
      if (this.selectedTemplate === 'twitter') {
        // Exportar a la plantilla de Twitter
        this.exportToTwitter(activitiesToExport);
      } else if (this.selectedTemplate === 'email') {
        // Exportar a la plantilla de Correo
        this.exportToEmail(activitiesToExport);
      }
    }
    
    exportToTwitter(activities: any[]) {
      this.downloadTemplate('twitter', activities);
    }
  
    exportToEmail(activities: any[]) {
      this.downloadTemplate('email', activities);
    }
  
    fillTemplate(template: string, activities: any[]): string {
      let filledTemplate = '';
    
      // Iterar sobre cada actividad y reemplazar los marcadores de posición en la plantilla
      activities.forEach(activity => {
        let activityTemplate = template; // Plantilla de actividad específica
        
        // Formatear fecha de inicio
        const fechaInicio = new Date(activity.fechaInicio.$date).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
        activityTemplate = activityTemplate.replace('{{ actividad.fechaInicio }}', fechaInicio);
        
        // Formatear hora de inicio
        const horaInicio = new Date(activity.fechaInicio.$date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        activityTemplate = activityTemplate.replace('{{ actividad.horaInicio }}', horaInicio);
        
        // Formatear fecha final
        const fechaFinal = new Date(activity.fechaFinal.$date).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
        activityTemplate = activityTemplate.replace('{{ actividad.fechaFinal }}', fechaFinal);
        
        // Formatear hora final
        const horaFinal = new Date(activity.fechaFinal.$date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        activityTemplate = activityTemplate.replace('{{ actividad.horaFinal }}', horaFinal);
    
        // Reemplazar los demás marcadores de posición
        activityTemplate = activityTemplate.replace('{{ actividad.titulo }}', activity.titulo);
        activityTemplate = activityTemplate.replace('{{ actividad.lugar }}', activity.lugar);
        activityTemplate = activityTemplate.replace('{{ actividad.descripcion }}', activity.descripcion);
        activityTemplate = activityTemplate.replace('{{ actividad.enlaceInformacion }}', activity.enlaceInformacion);
    
        // Agregar la plantilla de actividad a la plantilla final
        filledTemplate += activityTemplate + '\n';
      });
    
      return filledTemplate;
    }
    
  
    downloadTemplate(templateName: string, activities: any[]) {
      const fileName = `${templateName}-template.md`;
      this.http.get(`assets/${templateName}-template.md`, { responseType: 'text' }).subscribe(template => {
        const filledTemplate = this.fillTemplate(template, activities);
        const blob = new Blob([filledTemplate], { type: 'text/markdown;charset=utf-8' });
        saveAs(blob, fileName);
      });
    }
    
}

@Pipe({
  name: 'filtroActividades'
})
export class FiltroActividadesPipe implements PipeTransform {
  transform(actividades: any[], filtroFechaInicio: string, filtroFechaFinal: string, filtroLugar: string, filtroPonente: string[], filtroOrganizador: string[], filtroCategoria: string[]): any[] {
    if (!actividades) {
      return [];
    }
    // Si los campos de filtro están vacíos, devolvemos todas las actividades sin filtrar
    if (!filtroFechaInicio && !filtroFechaFinal && !filtroLugar && !filtroPonente && !filtroOrganizador && !filtroCategoria ) {
      console.log('Actividades recibidas sin filtro:', actividades);
      return actividades;
    }
    // Aplica filtros
    let actividadesFiltradas = actividades;
    if (filtroFechaInicio) {
      actividadesFiltradas = actividadesFiltradas.filter(actividad => actividad.fechaInicio.$date >= filtroFechaInicio+"T00:00:00Z");
      console.log('filtro fecha Inicio:', filtroFechaInicio);
      console.log('Actividades recibidas:', actividadesFiltradas);
    }
    if (filtroFechaFinal) {
      actividadesFiltradas = actividadesFiltradas.filter(actividad => actividad.fechaFinal.$date <= filtroFechaFinal+"T23:59:00Z");
      console.log('filtro fecha final:', filtroFechaFinal);
      console.log('Actividades recibidas:', actividadesFiltradas);
    }
    if (filtroLugar) {
      actividadesFiltradas = actividadesFiltradas.filter(actividad => actividad.lugar.includes(filtroLugar));
      console.log('Actividades recibidas lugar:', actividadesFiltradas);
    }
    if (filtroPonente && filtroPonente.length > 0) {
      actividadesFiltradas = actividadesFiltradas.filter(actividad => actividad.ponente.some((ponente: string) => filtroPonente.indexOf(ponente) !== -1));
      console.log('Actividades recibidas ponente:', actividadesFiltradas);
    }
    if (filtroOrganizador && filtroOrganizador.length > 0) {
      actividadesFiltradas = actividadesFiltradas.filter(actividad => actividad.organizador.some((organizador: string) => filtroOrganizador.indexOf(organizador) !== -1));
      console.log('Actividades recibidas organizador:', actividadesFiltradas);
    }
    if (filtroCategoria && filtroCategoria.length > 0) {
      actividadesFiltradas = actividadesFiltradas.filter(actividad => actividad.categoria.some((categoria: string) => filtroCategoria.indexOf(categoria) !== -1));
      console.log('Actividades recibidas categoria:', actividadesFiltradas);
    }
    // Agrega más filtros para los otros parámetros
    return actividadesFiltradas;
  }
}
