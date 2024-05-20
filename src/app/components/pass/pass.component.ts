import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css']
})
export class PassComponent implements OnInit {

  errorP: string = "";

  constructor(private apiS: ApiService, private cookieS: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  enviarRecuperacion(){
    const pass: HTMLInputElement|null = document.querySelector('#pass');
    const passRep: HTMLInputElement|null = document.querySelector('#passRep');

    if(pass?.value && passRep?.value){
      if(pass.value != "" || passRep.value != ""){
        if(pass.value == passRep.value){
          if(this.cookieS.get("recuperacion")){
            let correoR = this.cookieS.get("recuperacion");
            let data = {pass: pass.value, correo: correoR};
            this.apiS.enviarNuevaPass(data).subscribe((response)=>{
              if(response){
                this.router.navigate(["/home"]); 
              }
            });
          }else{
            this.errorP = "Usted no está intentando recuperar su contraseña";
          }
        }else{
          this.errorP = "Las contraseñas deben coincidir";
          setTimeout(() => {
            this.errorP = "";
          }, 3000);
        }
      }else{
        this.errorP = "No puedes dejar un campo vacío";
        setTimeout(() => {
          this.errorP = "";
        }, 3000);
      }
    }else{      
      this.errorP = "No puedes dejar un campo vacío";
      setTimeout(() => {
        this.errorP = "";
      }, 3000);
    }
  }
}
