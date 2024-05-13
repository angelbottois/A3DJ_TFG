import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'http://localhost/a3dj_api/api/v1/a3dj';

  constructor(private http: HttpClient) { }

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
    return this.http.post(url, data);
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
