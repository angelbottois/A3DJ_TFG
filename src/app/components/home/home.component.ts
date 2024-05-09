import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

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

  

}
