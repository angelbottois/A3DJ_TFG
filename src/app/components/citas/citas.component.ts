import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Hora } from 'src/app/interfaces/_interfacesUsuario';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})

export class CitasComponent implements OnInit {

  modalSwitch: boolean = false;
  infoModal: boolean = false;

  horas: Hora[] = [
    {
      id: 0,
      hora: ""
    },
    {
      id: 0,
      hora: ""
    },
    {
      id: 0,
      hora: ""
    },
    {
      id: 0,
      hora: ""
    }
  ];
  fecha: any = null;
  errorM: string = "";
  errorF: string = "";
  constructor(private apiS: ApiService, private modalS: ModalService, private cookieS: CookieService) { }

  ngOnInit(): void {
    if(this.cookieS.get('iniciado') == "false"){
      this.switchModal();
    }
    this.limitarFecha();
    this.obtenerHorasDisponibles();
    this.modalS.$modal.subscribe((valor)=>{this.modalSwitch = valor});
  }

  obtenerHorasDisponibles(){
    let input: HTMLInputElement|null = document.querySelector('#fecha');    
    input?.addEventListener('input',()=>{
      this.limpiar();
      this.fecha = input?.value;      
      this.apiS.obtenerHoras(input?.value).subscribe((horas)=>{        
        if(horas == null){
          this.horas[0].id = 0;
          this.horas[0].hora = "No hay horas disponibles";
        }else{
          horas.forEach((hora: any, index: number) => {
            this.horas[index].id = hora;
            switch (hora){
              case 1:
                this.horas[index].hora = "10:00";
                break;
              case 2:
                this.horas[index].hora = "12:00";
                break;
              case 3:
                this.horas[index].hora = "16:00";
                break;
              case 4:
                this.horas[index].hora = "18:00";
                break;    
            }
          });
        }
      });
    });
  }

  limitarFecha(){
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const day = fechaActual.getDate().toString().padStart(2, '0');
    const input: any|null = document.getElementById('fecha');    
    if(input){
      input.min = `${year}-${month}-${day}`;
    }
  }

  insertarCita(){
    if(this.cookieS.get('iniciado') == "false"){
      this.switchModal();
      return;
    }
    const motivo: any = document.querySelector('#motivo');
    let fecha: HTMLInputElement|null = document.querySelector('#fecha');
    let hora: HTMLInputElement|null = document.querySelector('#hora');
    if(motivo.value != ""){
      if(fecha?.value){
        if(hora?.value != "0"){            
          let data = {fecha: fecha.value, detalles: motivo.value, hora: hora?.value};
          this.apiS.addCita(data).subscribe((response)=>{            
            if(response){
              this.switchInfo();
            }else{
              location.reload();
            }
          });
        }else{
          this.errorF = "Seleccione otra fecha";
          setTimeout(() => {
            this.errorF = "";
          }, 3000);
        }
      }else{
        this.errorF = "Debes seleccionar una fecha";
        setTimeout(() => {
          this.errorF = "";
        }, 3000);
      }
    }else{
      this.errorM = "Debes agregar un motivo";
      setTimeout(() => {
        this.errorM = "";
      }, 3000);
    }
  }

  limpiar(){
    this.horas.forEach(hora=>{
      hora.id = 0;
      hora.hora = "";
    });
  }

  switchInfo(){
    this.infoModal = true;
  }

  closeModal(){
    this.infoModal = false;
    location.reload();
  }

  switchModal(): void{
    this.modalSwitch = true;
  }
}
