import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal/modal.service';
import { ApiService } from '../services/api/api.service';
import { Cliente, Supervisor } from '../interfaces/_interfacesUsuario';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  estado: string = "l"; 

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

  constructor(private modalS: ModalService, private apiS: ApiService) { }

  ngOnInit(): void {
  }

  registrarCliente(){
    const nombre: HTMLInputElement | null = document.querySelector('#nombre');
    const apellidos: HTMLInputElement | null = document.querySelector('#apellidos');
    const correo: HTMLInputElement | null = document.querySelector('#emailR');
    const pass: HTMLInputElement | null = document.querySelector('#passwordR');
    const repPass: HTMLInputElement | null = document.querySelector('#repPassword');
    
    if(nombre && apellidos && correo && pass && repPass && pass.value==repPass.value){
      let data = {
        nombre: nombre.value,
        apellidos: apellidos.value,
        correo: correo.value,
        pass: pass.value
      }
      this.apiS.register(data);
    }else{
      console.log("Contraseñas diferentes");
      
    }

  }

  iniciarSesion(){
    const correo: HTMLInputElement | null = document.querySelector('#email');
    const pass: HTMLInputElement | null = document.querySelector('#password');
    
    if(correo && pass){
      // this.apiS.login().subscribe()
      
      

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
}
