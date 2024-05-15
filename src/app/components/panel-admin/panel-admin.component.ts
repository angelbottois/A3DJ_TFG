import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminModalService } from 'src/app/services/admin-modal/admin-modal.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  modalSwitch: boolean = false;

  constructor(private cookieS: CookieService, private router: Router, private modalS: AdminModalService) { }

  ngOnInit(): void {
    if(this.cookieS.get("iniciado") == "false"){
      this.router.navigate(["/home"]);
    }
    this.modalS.$modal.subscribe((valor)=>{this.modalSwitch = valor});
  }


  switchModal(): void{
    this.modalSwitch = true;    
  }
}
