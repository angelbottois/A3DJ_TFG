import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  horas: any = null;

  constructor(private apiS: ApiService) { }

  ngOnInit(): void {
    this.limitarFecha();
    this.obtenerHorasDisponibles();
  }

  obtenerHorasDisponibles(){
    let input: HTMLInputElement|null = document.querySelector('#fecha');
    input?.addEventListener('input',()=>{
      this.apiS.obtenerHoras(input?.value).subscribe((horas)=>{
        this.horas = horas;
        console.log(this.horas);
        
        
        
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
}
