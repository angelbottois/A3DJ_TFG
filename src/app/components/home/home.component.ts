import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  listaPiezas: any = [];
  allowCookies: string = "false";

  constructor(private cookieS: CookieService, private apiS: ApiService) { }

  ngOnInit(): void {
    this.obtenerPiezasPopulares();  
    if(this.cookieS.get("allowCookies")){
      this.allowCookies = this.cookieS.get("allowCookies");
    }  
  }

  info(){
    document.querySelector('.info')?.classList.add('hidden')
  }

  closeModal(){
    this.cookieS.set("allowCookies", "true");
    location.reload();
  }

  obtenerPiezasPopulares(){
    this.apiS.obtenerPiezasPopulares().subscribe((response)=>{
      if(response){        
        this.listaPiezas = response;
      }
    });
  }

  persistirPieza(id: string){
    this.cookieS.set("pieza", id);
  }
}
