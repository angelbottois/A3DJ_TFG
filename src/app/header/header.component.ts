import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ModalService } from '../services/modal/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  modalSwitch: boolean = false;

  logoScene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000);
  renderer = new THREE.WebGLRenderer( {alpha: true} );

  constructor(private modalS: ModalService) { }

  ngOnInit(): void {
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

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial( {color: 0X60A5FA} );

    const cube = new THREE.Mesh(geometry, material);
    this.logoScene.add(cube);
    this.camera.position.z = 5;

    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 10 } );
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

    this.logoScene.add(edges);

    let animate = ()=>{
      requestAnimationFrame( animate );
      cube.rotation.x += 0.006;
      cube.rotation.y += 0.006;
      edges.rotation.copy(cube.rotation);
      this.renderer.render(this.logoScene, this.camera);
    };
    animate();

    // const loader = new THREE.TextureLoader();
    // loader.load('../../assets/img/logo.png', (texture)=>{
    //   if(texture){
    //     material.map = texture;
    //     animate();
    //   }
    // });
  }
}
