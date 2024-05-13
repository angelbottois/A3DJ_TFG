import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private cookieS: CookieService, private router: Router) { }

  ngOnInit(): void {
    if(this.cookieS.get("iniciado") == "false"){
      this.router.navigate(["/home"]);
    }
  }

}
