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

  constructor(private apiS: ApiService, private cookieS: CookieService) { }

  ngOnInit(): void {
    this.obtenerPiezas();
  }

  obtenerPiezas(){
    this.apiS.obtenerPiezas().subscribe((response)=>{
      console.log(response);
      this.listaPiezas = response;
    });
  }

  persistirPieza(id: string){
    this.cookieS.set("pieza", id);
  }
}
