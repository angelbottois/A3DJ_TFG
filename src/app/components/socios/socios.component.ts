import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent implements OnInit {

  planesSocios = [];
  modalSwitch: boolean = false;

  constructor(private apiS: ApiService, private modalS: ModalService, private cookieS: CookieService) { }

  ngOnInit(): void {
    if(this.cookieS.get('iniciado') == "false"){
      this.switchModal();
    }
    this.apiS.obtenerPlanes().subscribe((planes) =>{
      this.planesSocios = planes;     
      // this.obtenerBeneficios(); 
    });
    this.modalS.$modal.subscribe((valor)=>{this.modalSwitch = valor});
  }

  obtenerBeneficios(){
    let beneficios = document.querySelectorAll("#beneficios");
    beneficios.forEach(p => {
      let texto = p.textContent;
      let benef = texto?.split("-");
      benef?.forEach(b => {
        p.textContent += b;
      });
    });
  }

  switchModal(): void{
    this.modalSwitch = true;
  }
}
