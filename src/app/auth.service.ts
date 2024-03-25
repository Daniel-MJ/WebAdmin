import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseSearchUrl = 'https://localhost:8183/ApiServerWeb';
  private token: string = "";

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseSearchUrl}/login`;
    return this.http.post<any>(url, { username, password }).pipe(
      tap(response => {
        this.token = response.token;
      })
    );
  }

  logout(): void {
    this.token = "";
    // Lógica adicional si es necesario (por ejemplo, enviar una solicitud al backend para invalidar el token)
  }

  getToken(): string {
    return this.token;
  }

}
