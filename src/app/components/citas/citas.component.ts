import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  horas: any = null;
  fecha: any = null;
  errorM: string = "";
  errorF: string = "";
  constructor(private apiS: ApiService) { }

  ngOnInit(): void {
    this.limitarFecha();
    this.obtenerHorasDisponibles();
  }

  obtenerHorasDisponibles(){
    let input: HTMLInputElement|null = document.querySelector('#fecha');
    input?.addEventListener('input',()=>{
      this.fecha = input?.value;
      this.apiS.obtenerHoras(input?.value).subscribe((horas)=>{
        if(horas.length == 0){
          this.horas[0].idHora = "0";
          this.horas[0].hora = "No hay horas disponibles";
        }else{
          this.horas = horas;
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
    const motivo: any = document.querySelector('#motivo');
    let fecha: HTMLInputElement|null = document.querySelector('#fecha');
    let hora: HTMLInputElement|null = document.querySelector('#hora');
    if(motivo.value != ""){
      if(fecha?.value){
        if(hora?.value != "0"){
          


          // this.apiS.addCita();
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
}
