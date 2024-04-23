import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../apirestlet.service';

@Component({
  selector: 'app-template-preview',
  //standalone: true,
  //imports: [],
  templateUrl: './template-preview.component.html',
  styleUrl: './template-preview.component.css'
})
export class TemplatePreviewComponent implements OnInit {
  template:string = '';
  fileName: string = '';

  constructor(private route: ActivatedRoute,  private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    // Obtener los parámetros de consulta de la URL
    this.route.queryParams.subscribe(params => {
      // Comprobar si los parámetros blob y fileName están presentes
      if (params['template'] && params['fileName']) {
        // Asignar los valores de los parámetros a las variables del componente
        this.template = params['template'];
        this.fileName = params['fileName'];
        console.log(this.template);
        console.log(this.fileName);
      }
    });
  }
   sendTemplate() {
    // Realizar la solicitud HTTP para enviar la plantilla a Twitter
    if(this.fileName == "twitter"){
      this.apiService.sendToTwitter(this.template)
      .subscribe(
        response => {
          console.log(response); // Aquí puedes manejar la respuesta del servidor
        },
        error => {
          console.error(error); // Aquí puedes manejar los errores
        }
      );
    }else{
      // Realizar la solicitud HTTP para enviar la plantilla por correo electrónico
      this.apiService.sendToEmail(this.template).subscribe(
        response => {
          console.log('Plantilla enviada por correo electrónico correctamente:', response);
        },
        error => {
          console.error('Error al enviar la plantilla por correo electrónico:', error);
        }
      );
    }
  }
  
}
