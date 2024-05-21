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

  private getToken(){
    return this.cookieS.get('iniciado');   
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
  addPedido(data: any): Observable<any>{
    const url = `${this.apiUrl}/pedido`;
    return this.http.post(url, data);
  }
  updateCita(data: any): Observable<any>{
    const url = `${this.apiUrl}/cita`;
    return this.http.put(url, data);
  }
  enviarCorreoRecuperacion(correo: string): Observable<any>{
    const url = `${this.apiUrl}/recuperar/${correo}`;
    return this.http.get(url);
  }
  enviarNuevaPass(data: any): Observable<any>{
    const url = `${this.apiUrl}/password`;
    return this.http.put(url, data);
  }
  esAdmin(): Observable<any>{
    const url = `${this.apiUrl}/admin`;
    const data = {token: this.getToken()};
    return this.http.post(url, data);
  }
  obtenerClienteToken(token: string){
    const url = `${this.apiUrl}/clienteToken/${token}`;
    return this.http.get(url);
  }
  obtenerHoras(fecha: any): Observable<any>{
    const url = `${this.apiUrl}/horasDisp/${fecha}`;    
    return this.http.get(url);
  }
  obtenerPiezas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/piezas`);
  }
  obtenerPiezaId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/piezaId/${id}`);
  }
  obtenerPiezasPopulares(): Observable<any> {
    return this.http.get(`${this.apiUrl}/piezasPop`);
  }
  obtenerPlanes(): Observable<any>{
    return this.http.get(`${this.apiUrl}/planes`);
  }
  obtenerCitas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/citas`);
  }
  obtenerPedidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedidos`);
  }
  obtenerUsuarioCorreo(correo: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/usuarioCorreo/${correo}`);
  }
  obtenerImpresoras(): Observable<any>{
    return this.http.get(`${this.apiUrl}/impresoras`);
  }
}
