import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent implements OnInit {

  planesSocios = [];

  constructor(private apiS: ApiService) { }

  ngOnInit(): void {
    this.apiS.obtenerPlanes().subscribe((planes) =>{
      this.planesSocios = planes;     
      // this.obtenerBeneficios(); 
    });
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
}
