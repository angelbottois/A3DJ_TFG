import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  listaPiezas: any = [];
  allPiezas: any = [];

  constructor(private apiS: ApiService, private cookieS: CookieService) { }

  ngOnInit(): void {
    this.obtenerPiezas();
  }

  obtenerPiezas(){
    this.apiS.obtenerPiezas().subscribe((response)=>{
      this.allPiezas = response;
      this.mostrarPiezas();
    });
  }

  mostrarPiezas(){
    for(let i = 0; i < 4; i++){
      this.listaPiezas[i] = this.allPiezas[i];
    }
  }

  avazarPag(){
    for(let i = 0; i < 4; i++){
      this.listaPiezas[i] = this.allPiezas[i+4];
    }
  }

  retroPag(){
    for(let i = 0; i < 4; i++){
      this.listaPiezas[i] = this.allPiezas[i];
    }
  }

  persistirPieza(id: string){
    this.cookieS.set("pieza", id);
  }
}
