import { Component } from '@angular/core';
import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'A3DJ_TFG';

  constructor() { }

  ngOnInit(){

  }

  generarFondo(){
    let scene: any;
    let camera: any;
    let renderer: any;
    let container: any, mouseX: any, mouseY: any, aspectRatio: any, height: any, 
      width: any, fieldOfView: any, nearPlane: any, farPlane: any,
      windowHalfX: any, windowHalfY: any, stats: any, geometry: any, 
      startStuff: any, materialOptions: any, stars: any;


    init();
    animate();
    
    function init(){
      container = document.querySelector('body');
      // document.body.style.overflow = 'hidden';

      width = window.innerWidth;
      height = window.innerHeight;
      aspectRatio = height/width;
      fieldOfView = 75;
      nearPlane = 1;
      farPlane = 1000;
      mouseX = 0;
      mouseY = 0;
      windowHalfX = width/2;
      windowHalfY = height/2;
      camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

      camera.position.z = farPlane / 2;
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.0003);

      starForge();

      if(webGLSupport()){
        renderer = new THREE.WebGLRenderer({alpha: true});
      }else{
        // renderer = new THREE.CanvasRenderer();
      }

      renderer.setClearColor(0x000011, 1);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.appendChild(renderer.doomElement);

      stats = new stats();
      stats.doomElement.style.position = 'absolute';
      stats.doomElement.style.top = '0px';
      stats.doomElement.style.rigth = '0px';
      container.appendChild(stats.doomElement);

      window.addEventListener('resize', onWindowResize, false);
      document.addEventListener('mousemove', onMouseMove, false);
    }

    function animate(){
      requestAnimationFrame(animate);
      render();
      stats.update();
    }

    function render(){
      camera.position.x += (mouseX - camera.position.x) * 0.005;
      camera.position.y += (mouseY - camera.position.y) * 0.005;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    function webGLSupport(){
      try{
        let canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (
          canvas.getContext('webgl') || canvas.getContext('experiment-webgl')
        ));
      }catch (e){
        return false;
      }
    }

    function onWindowResize(){
      let height2 = window.innerHeight;
          width = window.innerWidth;
      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
      renderer.setSize(height2, width);
    }

    function starForge(){
      let starQty = 45000;
      geometry = new THREE.SphereGeometry(1000, 100, 50);

      materialOptions = {size: 1.0,transparency: true,opacity: 0.7};
      startStuff = new THREE.PointsMaterial(materialOptions);

      for(let i = 0; i<starQty; i++){
        let starVertex = new THREE.Vector3();
        starVertex.x = Math.random() * 2000 - 1000;
        starVertex.y = Math.random() * 2000 - 1000;
        starVertex.z = Math.random() * 2000 - 1000;
        geometry.vertives.push(starVertex);
      }
      // stars = new THREE.PointCloud(geometry, starStuff);
      scene.add(stars);
    }

    function onMouseMove(e: any){
      mouseX = e.clienteX - windowHalfX;
      mouseY = e.clienteY - windowHalfY;

    }

  }
}
