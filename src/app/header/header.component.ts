import { ApiService } from './../services/api/api.service';
import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ModalService } from '../services/modal/modal.service';
import { SesionService } from '../services/sesion/sesion.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  modalSwitch: boolean = false;
  iniciado: string = "";
  
  logoScene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000);
  renderer = new THREE.WebGLRenderer( {alpha: true} );

  constructor(private router: Router ,private modalS: ModalService, private sesionS: SesionService, private apiS: ApiService, private cookieS: CookieService) { }

  ngOnInit(): void {
    if(!this.cookieS.get("iniciado")){
      this.cookieS.set("iniciado", "false");
      this.iniciado = this.cookieS.get("iniciado");
    }else{
      this.iniciado = this.cookieS.get("iniciado");
    }
    this.modalS.$modal.subscribe((valor)=>{this.modalSwitch = valor});
    this.createLogo();
  }


  switchModal(): void{
    this.modalSwitch = true;
  }

  createLogo(): void{
    const logo = document.querySelector('.logo'); 
    this.renderer.setSize(200, 200);
    logo?.appendChild(this.renderer.domElement);

    // const geometry = new THREE.BoxGeometry(3, 3, 3);
    const geometry = new THREE.IcosahedronGeometry(2,1);
    
    const material = new THREE.MeshBasicMaterial( {color: 0X3B82F6} );

    const cube = new THREE.Mesh(geometry, material);
    this.logoScene.add(cube);
    this.camera.position.z = 5;

    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

    this.logoScene.add(edges);

    let animate = ()=>{
      requestAnimationFrame( animate );
      cube.rotation.x += 0.002;
      cube.rotation.y += 0.006;
      edges.rotation.copy(cube.rotation);
      this.renderer.render(this.logoScene, this.camera);
    };
    animate();
  }

  cerrarSesion() :void{
    this.cookieS.set("iniciado", "false");
    location.reload();
  }
}
