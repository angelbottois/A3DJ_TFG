import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal/modal.service';
import { ApiService } from '../services/api/api.service';
import { Cliente, Supervisor } from '../interfaces/_interfacesUsuario';
import { CookieService } from 'ngx-cookie-service';
import { core } from '@angular/compiler';
import { rejects } from 'assert';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  estado: string = "l"; 
  activo = false;
  existe: boolean = false;
  iniciado: string = "";
  registrado: boolean = false;
  enviado: boolean = false;
  error: string = "";
  passError: string = "";
  nameError: string = "";
  apeError: string = "";
  mailError: string = "";

  constructor(private modalS: ModalService, private apiS: ApiService, private cookieS: CookieService) { }

  ngOnInit(): void {
    if(!this.cookieS.get("iniciado")){
      this.cookieS.set("iniciado", "false");
      this.iniciado = this.cookieS.get("iniciado");
    }else{
      this.iniciado = this.cookieS.get("iniciado");
    }
  }

  registrarCliente(){
    const nombre: HTMLInputElement | null = document.querySelector('#nombre');
    const apellidos: HTMLInputElement | null = document.querySelector('#apellidos');
    const correo: HTMLInputElement | null = document.querySelector('#emailR');
    const pass: HTMLInputElement | null = document.querySelector('#passwordR');
    const repPass: HTMLInputElement | null = document.querySelector('#repPassword');
    
    if(nombre && apellidos && correo && pass && repPass && pass.value==repPass.value){
      if(nombre.value != ""){
        if(apellidos.value != ""){
          if(correo.value != ""){
            let data = JSON.stringify({nombre: nombre.value, apellidos: apellidos.value, pass: pass.value, correo: correo.value});
            this.apiS.register(data).subscribe(
              (response) => {
                this.registrado = response;
              }
            );
          }else{
            this.mailError = "Correo no válido";
            this.borrarValorError();
          }
        }else{
          this.apeError = "Apellidos no válidos";
          this.borrarValorError();
        }
      }else{
        this.nameError = "Nombre no válido";
        this.borrarValorError();
      }
    }else{
      this.passError = "Las contraseñas deben coincidir";   
      this.borrarValorError();
    }
  }

  async iniciarSesion() {
    const correo: HTMLInputElement | null = document.querySelector('#email');
    const pass: HTMLInputElement | null = document.querySelector('#password');
    
    if (correo && pass) {
      if (correo.value != "") {
        if (pass.value != "") {
          try {
            const response: any = await this.apiS.login(correo.value, pass.value).toPromise();
            if (response == null) {
              this.passError = "Credenciales incorrectas";
              this.borrarValorError();
            } else {
              await this.comprobarUsuarioActivo(correo.value);
              if (this.activo) {
                this.cookieS.set("iniciado", response);
                location.reload();
              } else {
                this.mailError = "Debes verificar la cuenta en tu correo";
                this.borrarValorError();
              }
            }
          } catch (error) {
            console.error('Error durante el inicio de sesión', error);
          }
        } else {
          this.passError = "Contraseña no válida";
          this.borrarValorError();
        }
      } else {
        this.mailError = "Correo no válido";
        this.borrarValorError();
      }
    }
  }

  async enviarCorreoRecuperacion(){
    const correo: HTMLInputElement|null = document.querySelector('#emailP');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(correo?.value && correo?.value != ""){
        if(regex.test(correo?.value)){          
          await this.comprobarUsuarioExiste(correo.value);
          if(this.existe){
            this.cookieS.set("recuperacion", correo.value);
            this.apiS.enviarCorreoRecuperacion(correo.value).subscribe((response)=>{              
              if(response == null){
                this.enviado = true;
              }
            });
          }else{
            this.error = "Este correo no está asociado a ninguna cuenta";
            setTimeout(() => {
              this.error = "";
            }, 3000);
          }
        }else{
          this.error = "Correo no válido";
          setTimeout(() => {
            this.error = "";
          }, 3000);
        }
    }else{
      this.error = "Por favor introduce el correo asociado a tu cuenta";
      setTimeout(() => {
        this.error = "";
      }, 3000);
    } 
  }
  
  comprobarUsuarioActivo(correo: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiS.obtenerUsuarioCorreo(correo).subscribe(
        (response: any) => {
          this.activo = response['activo'];
          resolve();
        },
        (error) => {
          console.error('Error al obtener el estado del usuario', error);
          reject(error);
        }
      );
    });
  }

  comprobarUsuarioExiste(correo: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiS.obtenerUsuarioCorreo(correo).subscribe((response)=>{
        response != null ? this.existe = true : null ;
        resolve();
      },
      (error) => {
        console.error('Error al obtener el estado del usuario', error);
        reject(error);
      });
    });
  }

  closeModal(){
    this.modalS.$modal.emit(false);
  }
  p(){
    this.estado = "p";
  }
  r(){
    this.estado = "r";
  }
  l(){
    this.estado = "l";
  }
  borrarValorError(){
    setTimeout(() => {
      this.passError = "";
      this.nameError = "";
      this.apeError = "";
      this.mailError = "";
    }, 2000);
  }
}
