import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'A3DJ_TFG';
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private stars: THREE.Mesh[] = [];
  private controls!: OrbitControls;

  constructor() { }

  ngOnInit(): void {
    this.init();
    this.addSphere();
  }

  ngAfterViewInit(): void {
    this.animateStars();
  }

  private init(): void {
    // Configurar la cámara
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 5;

    // Configurar la escena
    this.scene = new THREE.Scene();
    let color = new THREE.Color(0x353437);
    this.scene.background = color;
    // Configurar el renderer
    this.renderer = new THREE.WebGLRenderer();
    this.setRendererSize();
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';
    this.renderer.domElement.style.left = '0';
    this.renderer.domElement.style.zIndex = '-1';

    // Añadir el renderer al body del documento HTML
    document.body.appendChild(this.renderer.domElement);

    // Configurar OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = false;
    this.controls.enableRotate = false;

    // Manejar el redimensionamiento de la ventana
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    // Manejar el movimiento del ratón
    // window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
  }

  private addSphere(): void {
    for (let z = -1000; z < 1000; z += 6) {
      const random = +(Math.random() * 10).toFixed(0);
      let colorValue: number;
      switch (random) {
        case 0:
        case 1:
        case 2:
        case 3:
          colorValue = 0x53576b;
          break;
        case 4:
        case 5:
        case 6:
          colorValue = 0x7a7b7c;
          break;
        case 7:
        case 8:
        case 9:
          colorValue = 0xa39b7e;
          break;
        default:
          colorValue = 0xe2c99f;
          break;
      }

      const geometry = new THREE.SphereGeometry(1.5, 1, 3);
      const material = new THREE.MeshBasicMaterial({ color: colorValue });
      const sphere = new THREE.Mesh(geometry, material);
      const sphere1 = new THREE.Mesh(geometry, material);

      sphere.position.x = Math.random() * 1000 - 500;
      sphere.position.y = Math.random() * 1000 - 500;
      sphere.position.z = z;

      sphere1.position.x = Math.random() * 1000 - 500;
      sphere1.position.y = Math.random() * 1000 - 500;
      sphere1.position.z = z;

      sphere.scale.x = sphere.scale.y = 2;
      sphere1.scale.x = sphere1.scale.y = 2;

      this.scene.add(sphere);
      this.scene.add(sphere1);

      this.stars.push(sphere);
      this.stars.push(sphere1);
    }
  }

  @HostListener('window:resize', ['$event'])
  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.setRendererSize();
  }

  private setRendererSize(): void {
    const width = window.innerWidth;
    const height = Math.max(window.innerHeight, document.body.scrollHeight);
    this.renderer.setSize(width, height);
  }

  private animateStars(): void {
    requestAnimationFrame(() => this.animateStars());
    for (const star of this.stars) {
      star.position.z += 0.1;
      if (star.position.z > 1000) star.position.z -= 2000;
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  // private onMouseMove(event: MouseEvent): void {
  //   const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  //   const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

  //   this.camera.position.x += mouseX * 0.04;
  //   this.camera.position.y += mouseY * 0.04;

  //   this.camera.lookAt(this.scene.position);
  // }
}
