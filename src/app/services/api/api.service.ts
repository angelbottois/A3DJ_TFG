import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'http://localhost/a3dj_api/api/v1/a3dj';

  constructor(private http: HttpClient, private cookieS: CookieService) { }

  private getHeaders(): HttpHeaders {
    const token = this.cookieS.get('iniciado');
    return new HttpHeaders().set('authorization', `Bearer ${token}`);
  }

  login(correo: string, pass: string): Observable<any>{
    const url = `${this.apiUrl}/iniciarSesion/${correo}/${pass}`;
    return this.http.get(url);
  }
  register(data: any): Observable<any>{    
    const url = `${this.apiUrl}/cliente`;    
    return this.http.post(url, data)
  }
  addCita(data: any): Observable<any>{
    const url = `${this.apiUrl}/cita`;
    const headers = this.getHeaders();
    return this.http.post(url, data, {headers});
  }
  obtenerHoras(fecha: any): Observable<any>{
    const url = `${this.apiUrl}/horasDisp/${fecha}`;    
    return this.http.get(url);
  }
  obtenerPiezas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/piezas`);
  }
  obtenerPlanes(): Observable<any>{
    return this.http.get(`${this.apiUrl}/planes`);
  }
}
