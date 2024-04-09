import { Injectable } from '@angular/core';
import { Insputssearch } from './insputssearch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jsSHA from 'jssha';

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

  sendToTwitter(template: string): Observable<any> {
    // Realizar la solicitud HTTP POST a la API de Twitter para realizar un tweet
    const apiUrl = 'http://localhost:4200/ApiXUGR/1.0/statuses/update.json';
    const apiKey = '8Rql16WGMlg6eweM11VTWckjJ';
    const apiSecretKey = 'UGqpXRCzsDrByYo9jm3ZMyzZLTb2EwqUehY0dgr56A8g6nywkx';
    const accessToken = '1055465892438573056-gqKDtxPczkhzZMeor62T6eIT2IeHdB';
    const accessTokenSecret = 'OZ47hSAgqzvpULijHbKtBxuo2XIH8hQURBjU8V3BwO2Q3';
    const nonce = generateNonce();
    const timestamp = generateTimestamp();
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'OAuth oauth_consumer_key="' + apiKey + '", oauth_nonce="' + nonce + '", oauth_signature="GENERATE_SIGNATURE", oauth_signature_method="HMAC-SHA1", oauth_timestamp="' + timestamp + '", oauth_token="' + accessToken + '", oauth_version="1.0"'
    });
    const requestBody = {
      tweet: template
    };
  
    return this.httpClient.post<any>('URL_DEL_ENDPOINT_DE_TWITTER', requestBody);
  }
  

}

function generateNonce() {
  // Generar un array de bytes aleatorios
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  const randomNumbers = Array.from(randomBytes);

  // Convertir los bytes aleatorios a una cadena base64
  const base64String = btoa(String.fromCharCode.apply(null, randomNumbers));

  // Eliminar caracteres no alfanuméricos
  const nonce = base64String.replace(/\W/g, '');

  return nonce;
}

function generateTimestamp(): string {
  return Math.floor(Date.now() / 1000).toString();
}

function generateOAuthSignature(method: string, url: string, apiKey: string, apiSecretKey: string, accessToken: string, accessTokenSecret: string, timestamp: string, nonce: string, template: string): string {
  const baseString = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(generateParameterString(apiKey, accessToken, timestamp, nonce, template))}`;
  const signingKey = `${encodeURIComponent(apiSecretKey)}&${encodeURIComponent(accessTokenSecret)}`;
  const signature = hmacSHA1(baseString, signingKey);
  return encodeURIComponent(signature);
}

function generateParameterString(apiKey: string, accessToken: string, timestamp: string, nonce: string, template: string): string {
  const parameters: { [key: string]: string } = {
    oauth_consumer_key: apiKey,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_token: accessToken,
    oauth_version: '1.0',
    tweet: template
  };

  const parameterString = Object.keys(parameters)
    .sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`)
    .join('&');

  return parameterString;
}

function hmacSHA1(baseString: string, signingKey: string): string {
  // Crear un nuevo objeto de hash SHA-1
  const shaObj = new jsSHA('SHA-1', 'TEXT');

  // Establecer la clave de firma
  shaObj.setHMACKey(signingKey, 'TEXT');

  // Calcular el hash HMAC
  shaObj.update(baseString);
  const hmac = shaObj.getHMAC('B64');

  return hmac;
}


