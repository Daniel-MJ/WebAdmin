import { Injectable } from '@angular/core';
import { Insputssearch } from './insputssearch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jsSHA from 'jssha';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseSearchUrl = 'https://localhost:8183/ApiServerWeb';

  constructor(private httpClient: HttpClient) {}

  getAllActividades(): Observable<Insputssearch[]> {
    const url = `${this.baseSearchUrl}/manageActivities`;
    const token = localStorage.getItem('auth_token'); //Guardas el token en el almacenamiento local después de iniciar sesión
	  const headers = new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`, // Incluir el token JWT en el encabezado de autorización con el prefijo "Bearer"
	  });

    return this.httpClient.get<Insputssearch[]>(url,{ headers, withCredentials: true });
  }

  postActivities(titulo: String, tipo: String, fechaInicio: String, fechaFinal: String, horaInicio: String, horaFinal: String, ponente: String[], organizador: String[], lugar: String, limiteAsistentes: String, enlaceInformacion: String, enlaceInscripcion: String, descripcion: String, categoria: String[]   ): Observable<string> {
      // Crear un objeto JSON con los nombres de usuario y contraseña
    const requestBody
     = {
      titulo: titulo,
      tipo: tipo,
      fechaInicio: {
          "$date": fechaInicio+"T"+horaInicio+":00Z"
      },
      fechaFinal: {
          "$date": fechaFinal+"T"+horaFinal+":00Z"
      },
      ponente: ponente,
      organizador: organizador,
      lugar: lugar,
      limiteAsistentes: limiteAsistentes,
      enlaceInformacion: enlaceInformacion,
      enlaceInscripcion: enlaceInscripcion,
      descripcion: descripcion,
      categoria: categoria
    };
    // Convertir el objeto JSON a una cadena
    const requestBodyString = JSON.stringify(requestBody);

    const url = `${this.baseSearchUrl}/manageActivities`;
    // const headers  = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: 'Basic ' + btoa('nuevoUsuario:nuevaContrasena'),
    // });
    const token = localStorage.getItem('auth_token'); // Suponiendo que guardas el token en el almacenamiento local después de iniciar sesión
	  const headers = new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`, // Incluir el token JWT en el encabezado de autorización con el prefijo "Bearer"
	  });
    return this.httpClient.post(url, requestBodyString, { headers, withCredentials: true, responseType: 'arraybuffer' })
    .pipe(
      map(response => new TextDecoder('utf-8').decode(response))
    );
  }

  putActivities(titulo: String, tipo: String, fechaInicio: String, fechaFinal: String, horaInicio: String, horaFinal: String, ponente: String[], organizador: String[], lugar: String, limiteAsistentes: String, enlaceInformacion: String, enlaceInscripcion: String, descripcion: String, categoria: String[]   ): Observable<string> {
    // Crear un objeto JSON con los nombres de usuario y contraseña
    const requestBody
    = {
      titulo: titulo,
      tipo: tipo,
      fechaInicio: {
          "$date": fechaInicio+"T"+horaInicio+":00Z"
      },
      fechaFinal: {
          "$date": fechaFinal+"T"+horaFinal+":00Z"
      },
      ponente: ponente,
      organizador: organizador,
      lugar: lugar,
      limiteAsistentes: limiteAsistentes,
      enlaceInformacion: enlaceInformacion,
      enlaceInscripcion: enlaceInscripcion,
      descripcion: descripcion,
      categoria: categoria
    };
    // Convertir el objeto JSON a una cadena
    const requestBodyString = JSON.stringify(requestBody);

    const url = `${this.baseSearchUrl}/manageActivities`;
    // const headers  = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: 'Basic ' + btoa('nuevoUsuario:nuevaContrasena'),
    // });
    const token = localStorage.getItem('auth_token'); // Suponiendo que guardas el token en el almacenamiento local después de iniciar sesión
	  const headers = new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`, // Incluir el token JWT en el encabezado de autorización con el prefijo "Bearer"
	  });
    return this.httpClient.put(url, requestBodyString, { headers, withCredentials: true, responseType: 'arraybuffer' })
    .pipe(
      map(response => new TextDecoder('utf-8').decode(response))
    );
  }

  deleteActivities(activity: String): Observable<string> {

    const url = `${this.baseSearchUrl}/manageActivities?titulo=${activity}`;
    // const headers  = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: 'Basic ' + btoa('nuevoUsuario:nuevaContrasena'),
    // });
    const token = localStorage.getItem('auth_token'); // Suponiendo que guardas el token en el almacenamiento local después de iniciar sesión
	  const headers = new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`, // Incluir el token JWT en el encabezado de autorización con el prefijo "Bearer"
	  });
    return this.httpClient.delete(url, { headers, withCredentials: true, responseType: 'arraybuffer' })
    .pipe(
      map(response => new TextDecoder('utf-8').decode(response))
    );
  }



  postUser(user: String, pass: String): Observable<string> {
      // Crear un objeto JSON con los nombres de usuario y contraseña
    const requestBody = {
      username: user,
      password: pass
    };
    // Convertir el objeto JSON a una cadena
    const requestBodyString = JSON.stringify(requestBody);

    const url = `${this.baseSearchUrl}/createUser`;
    const token = localStorage.getItem('auth_token'); // Suponiendo que guardas el token en el almacenamiento local después de iniciar sesión
	  const headers = new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`, // Incluir el token JWT en el encabezado de autorización con el prefijo "Bearer"
	  });
    return this.httpClient.post(url, requestBodyString, { headers, withCredentials: true, responseType: 'arraybuffer' })
    .pipe(
      map(response => new TextDecoder('utf-8').decode(response))
    );
  }

  deleteUser(user: String): Observable<string> {

    const url = `${this.baseSearchUrl}/createUser?user=${user}`;
    const token = localStorage.getItem('auth_token'); // Suponiendo que guardas el token en el almacenamiento local después de iniciar sesión
	  const headers = new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`, // Incluir el token JWT en el encabezado de autorización con el prefijo "Bearer"
	  });
    return this.httpClient.delete(url, { headers, withCredentials: true, responseType: 'arraybuffer' })
    .pipe(
      map(response => new TextDecoder('utf-8').decode(response))
    );
  
  }
  sendToEmail(template: string): Observable<any> {
    const url = `${this.baseSearchUrl}/PostEmail`;
    const token = localStorage.getItem('auth_token'); // Obtener el token de autenticación almacenado en el localStorage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`
    });
    const body = JSON.stringify({ template: template }, null, 2); // Cuerpo de la solicitud JSON
    
    return this.httpClient.post<string>(url,body, { headers});
  }

  sendToTwitter(tweet: string): Observable<string> {
    const url = `${this.baseSearchUrl}/PostTwitter`;
    const token = localStorage.getItem('auth_token'); // Obtener el token de autenticación almacenado en el localStorage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`
    });
    const body = JSON.stringify({ tweet: tweet }, null, 2); // Cuerpo de la solicitud JSON
    
    return this.httpClient.post<string>(url,body, { headers});
  }

  

}