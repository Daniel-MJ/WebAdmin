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
    const url = `${this.baseSearchUrl}/searchActivities?METODO=All`;
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
    // Realizar la solicitud HTTP POST al servicio de envío de correo electrónico para enviar el correo
    const requestBody = {
      email: {
        to: 'destinatario@example.com',
        subject: 'Asunto del correo',
        body: template
      }
    };
  
    return this.httpClient.post<any>('URL_DEL_ENDPOINT_DEL_SERVICIO_DE_CORREO_ELECTRONICO', requestBody);
  }

  // sendToTwitter(template: string): Observable<void> {
  //   // Realizar la solicitud HTTP POST a la API de Twitter a través de CORS Anywhere
  //   const corsAnywhereUrl = 'http://mylocaldomain.com:8080/'; // URL de tu servidor CORS Anywhere
  //   const twitterApiUrl = 'https://api.twitter.com/1.1/statuses/update.json';
    
  //   const apiUrl = corsAnywhereUrl + twitterApiUrl; // Concatenar las dos URLs
  //   const apyKey = 'lRnB2NIpxM8edYrfPmmTFIFLI';
  //   const apiSecretKey = 'enTlKYeMiFXj6k4i8dmuHj1wNzkJkhbjLt8WMLvCHyjxUml75p';
  //   const accessToken = '1055465892438573056-1eAMdZkB3NZNttAsuaUYZgBVFJNsgq';
  //   const accessTokenSecret = 'u89dtNOMDBON5HwyKt8FXyUQOsOXIwpK4nR9ctUqvg4hH';
  //   const nonce = generateNonce();
  //   const timestamp = generateTimestamp();

  //   const parameters = {
  //     include_entities: 'true',
  //     oauth_consumer_key: apiKey,
  //     oauth_nonce: nonce,
  //     oauth_signature_method: 'HMAC-SHA1',
  //     oauth_timestamp: timestamp,
  //     oauth_token: accessToken,
  //     oauth_version: '1.0',
  //     status: template
  //   };
  //   //const signature = generateOAuthSignature('POST', apiUrl, apiKey, apiSecretKey, accessToken, accessTokenSecret, timestamp, nonce, template);
  //   const signature = generateOAuthSignature('POST', twitterApiUrl, parameters, apiSecretKey, accessTokenSecret);
  //   console.log("Firma",signature);



  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Authorization': `OAuth oauth_consumer_key="${apiKey}", oauth_nonce="${nonce}", oauth_signature="${signature}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${timestamp}", oauth_token="${accessToken}", oauth_version="1.0"`
  //   });
  //   const requestBody = {
  //     tweet: template
  //   };
  
  //   return this.httpClient.post<any>(apiUrl, requestBody, { headers: headers });

  // }

  sendToTwitter(tweet: string): Observable<string> {
    const url = `${this.baseSearchUrl}/PostTwitter`;
    const token = localStorage.getItem('auth_token'); // Obtener el token de autenticación almacenado en el localStorage
    console.log(token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    //const body = { tweet: tweet }; // Cuerpo de la solicitud JSON
    
    return this.httpClient.post<string>(url, { headers});
  }

  

}