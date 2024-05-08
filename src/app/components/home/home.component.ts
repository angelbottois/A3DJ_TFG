import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 


  constructor() { }

  ngOnInit(): void {
    // this.createNombre();
  }

  info(){
    document.querySelector('.info')?.classList.add('hidden')
  }

  generarNombre(){
    const fontLoader = new FontLoader();
    fontLoader.load(
      'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
      (droidFont)=>{
        const textGeometry = new TextGeometry('A3DJ',
          {
            height: 2,
            size: 10,
            font: droidFont,
          }
        );
        const textMaterial = new THREE.MeshNormalMaterial();
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.x = -36;
        textMesh.position.y = 5;
      }
    );
  }

}
