import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
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
