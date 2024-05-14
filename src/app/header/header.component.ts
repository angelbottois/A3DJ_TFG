import { ApiService } from './../services/api/api.service';
import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ModalService } from '../services/modal/modal.service';
import { SesionService } from '../services/sesion/sesion.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  modalSwitch: boolean = false;
  iniciado: string = "";
  admin: boolean = false;

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
      if(this.iniciado != "false"){
        this.esAdmin();
      }
    }
    this.modalS.$modal.subscribe((valor)=>{this.modalSwitch = valor});
    this.createLogo();
  }


  switchModal(): void{
    this.modalSwitch = true;
  }

  // createLogo(): void{
  //   const logo = document.querySelector('.logo'); 
  //   this.renderer.setSize(200, 200);
  //   logo?.appendChild(this.renderer.domElement);

  //   // const geometry = new THREE.BoxGeometry(3, 3, 3);
  //   const geometry = new THREE.IcosahedronGeometry(2,1);
    
  //   const material = new THREE.MeshBasicMaterial( {color: 0X3B82F6} );

  //   const cube = new THREE.Mesh(geometry, material);
  //   this.logoScene.add(cube);
  //   this.camera.position.z = 5;

  //   const edgesGeometry = new THREE.EdgesGeometry(geometry);
  //   const edgesMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
  //   const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

  //   this.logoScene.add(edges);

  //   let animate = ()=>{
  //     requestAnimationFrame( animate );
  //     cube.rotation.x += 0.002;
  //     cube.rotation.y += 0.006;
  //     edges.rotation.copy(cube.rotation);
  //     this.renderer.render(this.logoScene, this.camera);
  //   };
  //   animate();
  // }

  createLogo(): void {
    const logo = document.querySelector('.logo');
    this.renderer.setSize(200, 200);
    logo?.appendChild(this.renderer.domElement);
  
    // Cargar la fuente
    const fontLoader = new FontLoader();
    fontLoader.load('../../assets/font/Minecraft_Regular.json', (font) => {
      const textGeometry = new TextGeometry('A3DJ', {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });
  
      textGeometry.computeBoundingBox();
  
      // Verificar que la boundingBox no sea null
      if (textGeometry.boundingBox) {
        const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x3B82F6 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  
        this.logoScene.add(textMesh);
  
        // Centramos el texto
        textMesh.position.x = centerOffset;
        textMesh.position.y = 0;
        textMesh.position.z = 0;
  
        this.camera.position.z = 5;
  
        // Edges para el texto
        const edgesGeometry = new THREE.EdgesGeometry(textGeometry);
        const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
        const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  
        this.logoScene.add(edges);
  
        edges.position.copy(textMesh.position);
  
        // Añadir controles de órbita
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;
  
        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();  // Actualiza los controles
          this.renderer.render(this.logoScene, this.camera);
        };
  
        animate();
      } else {
        console.error('Bounding box is null for the text geometry.');
      }
    });
  }

  esAdmin(){
    if(this.iniciado != "false"){
      this.apiS.esAdmin().subscribe((response)=>{
        if(response){
          this.admin = true;
        }
      });
    }
  }

  cerrarSesion() :void{
    this.cookieS.set("iniciado", "false");
    location.reload();
  }
}
