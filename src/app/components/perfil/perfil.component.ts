import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombre: string = "";
  apellidos: string = "";
  correo: string = "";
  plan: string = "";
  img: string = "";

  constructor(private cookieS: CookieService, private router: Router, private apiS: ApiService) { }

  ngOnInit(): void {
    if(this.cookieS.get("iniciado") == "false"){
      this.router.navigate(["/home"]);
    }
    this.obtenerDatosUsuario();
  }

  async obtenerDatosUsuario(){
    this.apiS.obtenerClienteToken(this.cookieS.get('iniciado')).subscribe((response: any)=>{
      this.nombre = response.nombre;
      this.apellidos = response.apellidos;
      this.correo = response.correo;
      this.img = response.img;
      if(response.plan == null){
        this.plan = "Ninguno";
      }else{
        this.plan = response.planSocio;
      }
    this.createScene();

    });
  }

  private createScene(): void {
    // Obtener el contenedor usando el id directamente
    const container = document.getElementById('imagen');
    if (!container) {
      console.error('Contenedor no encontrado');
      return;
    }

    // Crear la escena
    const scene = new THREE.Scene();
    let color = new THREE.Color(0xa39b7e);
    scene.background = color;
    // Crear la cámara
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 2;

    // Crear el renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Crear la geometría del cubo
    const geometry = new THREE.BoxGeometry();

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(`../../../assets/img/` + this.img); 

    // Crear el material con la textura
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // Crear el cubo con la geometría y el material
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotar el cubo
      // cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Renderizar la escena
      renderer.render(scene, camera);
    };

    animate();

    // Ajustar el tamaño del renderizador al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }
}
