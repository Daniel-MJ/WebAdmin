import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseSearchUrl = 'https://localhost:8183/LoginApi';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  // login(username: string, password: string): Observable<string> {
  //   const url = `${this.baseSearchUrl}/login`;
  //   return this.http.post<string>(url, { username, password }).pipe(
  //     tap(token => {
  //       if (typeof token === 'string') {
  //         localStorage.setItem(this.tokenKey,token);
  //       } else {
  //         console.error('El token recibido no es una cadena de caracteres.');
  //       }
  //     })
  //   );
  // }
  login(username: string, password: string): Observable<void> {
    const url = `${this.baseSearchUrl}/login`;
    const requestBody = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, requestBody, { headers, responseType: 'arraybuffer' }).pipe(
      map(response => {
        const text = new TextDecoder('utf-8').decode(response);
        // Aquí puedes agregar lógica adicional si es necesario, como extraer el token del texto
        localStorage.setItem(this.tokenKey,text);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    // Lógica adicional si es necesario (por ejemplo, enviar una solicitud al backend para invalidar el token)
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

}
