import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.limitarFecha();
  }

  limitarFecha(){
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const day = fechaActual.getDate().toString().padStart(2, '0');
    const input: any|null = document.getElementById('fecha');
    console.log(input);
    
    if(input){
      input.min = `${year}-${month}-${day}`;
    }
  }
}
