import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal/modal.service';
import { ApiService } from '../services/api/api.service';
import { Cliente, Supervisor } from '../interfaces/_interfacesUsuario';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  estado: string = "l"; 
  iniciado: string = "";
  passError: string = "";
  nameError: string = "";
  apeError: string = "";
  mailError: string = "";

  currentUserC :Cliente = {
    idUsuario: "",
    correo: "",
    nombre: "",
    apellidos: "",
    fotoPerfil: "",
    activo: false,
    hashPass: "",
    planSocios: "",
    planActivo: false
  }
  currentUserS :Supervisor = {
    idUsuario: "",
    correo: "",
    nombre: "",
    apellidos: "",
    fotoPerfil: "",
    activo: false,
    hashPass: "",
    administrador: false
  }

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
              (response: any) => {
                
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

  iniciarSesion(){
    const correo: HTMLInputElement | null = document.querySelector('#email');
    const pass: HTMLInputElement | null = document.querySelector('#password');
    
    if(correo && pass){
      if(correo.value != ""){
        if(pass.value != ""){
          this.apiS.login(correo.value, pass.value).subscribe((response: any)=>{
            if(response == null){
              this.passError = "Credenciales incorrectas";
              this.borrarValorError();
            }else{
              this.cookieS.set("iniciado", "true");
            }
          })
        }else{
          this.passError = "Contraseña no válida";
          this.borrarValorError();
        }
      }else{
        this.mailError = "Correo no válido";
        this.borrarValorError();
      }
    }
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
