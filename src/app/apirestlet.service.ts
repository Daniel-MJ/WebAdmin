import { Injectable } from '@angular/core';
import { Insputssearch } from './insputssearch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseSearchUrl = 'https://localhost:8183/ApiServerWeb';

  constructor(private httpClient: HttpClient) {}

  getAllActividades(): Observable<Insputssearch[]> {
    const url = `${this.baseSearchUrl}/searchActivities?METODO=All`;
    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('nuevoUsuario:nuevaContrasena'),
    });

    return this.httpClient.get<Insputssearch[]>(url,{ headers, withCredentials: true });
  }

  getActividadesPorFecha(fechaInicio: String, fechaFinal: String): Observable<Insputssearch[]> {
    const url = `${this.baseSearchUrl}?METODO=forDate&fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`;
    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('nuevoUsuario:nuevaContrasena'),
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
    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('nuevoUsuario:nuevaContrasena'),
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
    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('nuevoUsuario:nuevaContrasena'),
    });
    return this.httpClient.put(url, requestBodyString, { headers, withCredentials: true, responseType: 'arraybuffer' })
    .pipe(
      map(response => new TextDecoder('utf-8').decode(response))
    );
  }

  deleteActivities(activity: String): Observable<string> {

    const url = `${this.baseSearchUrl}/manageActivities?titulo=${activity}`;
    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('nuevoUsuario:nuevaContrasena'),
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
    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('nuevoUsuario:nuevaContrasena'),
    });
    return this.httpClient.post(url, requestBodyString, { headers, withCredentials: true, responseType: 'arraybuffer' })
    .pipe(
      map(response => new TextDecoder('utf-8').decode(response))
    );
  }

  deleteUser(user: String): Observable<string> {

    const url = `${this.baseSearchUrl}/createUser?user=${user}`;
    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('nuevoUsuario:nuevaContrasena'),
    });
    return this.httpClient.delete(url, { headers, withCredentials: true, responseType: 'arraybuffer' })
    .pipe(
      map(response => new TextDecoder('utf-8').decode(response))
    );
  
  }
  
  
  getActividadesPorCategoria(categoria: String): Observable<Insputssearch[]> {
    const url = `${this.baseSearchUrl}?METODO=forCategory&categoria=${categoria}`;
    const headers  = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('nuevoUsuario:nuevaContrasena'),
    });
      return this.httpClient.get<Insputssearch[]>(url,{ headers, withCredentials: true });
  }

  async getActividadById(id: number): Promise<Insputssearch | undefined> {
    const url = `${this.baseSearchUrl}/${id}`;
    const data = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': 'Basic ' + btoa('nuevoUsuario:nuevaContrasena')
      }

    });
    return await data.json() ?? {};
  }

  // Puedes agregar más métodos según sea necesario para interactuar con tu API RESTLET
}
