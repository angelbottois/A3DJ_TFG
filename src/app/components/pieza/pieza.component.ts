import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api/api.service';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GCodeLoader } from 'three/examples/jsm/loaders/GCodeLoader';

@Component({
  selector: 'app-pieza',
  templateUrl: './pieza.component.html',
  styleUrls: ['./pieza.component.css']
})
export class PiezaComponent implements OnInit, AfterViewInit, OnDestroy {

  private renderer: THREE.WebGLRenderer | undefined;
  private scene: THREE.Scene | undefined;
  private camera: THREE.PerspectiveCamera | undefined;
  private controls: OrbitControls | undefined;
  private container: HTMLElement | null = null;

  idPieza: string = "";
  pieza: any = [];

  constructor(private apiS: ApiService, private cookieS: CookieService) { }

  ngOnInit(): void {
    this.idPieza = this.cookieS.get("pieza");
    this.obtenerPieza();
  }

  ngAfterViewInit(): void {
    this.container = document.getElementById('pieza');
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onWindowResize);
  }

  private initThreeJS(): void {
    if (!this.container) {
      console.error('No se encontró el contenedor con id "pieza"');
      return;
    }

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 1, 1000);
    this.camera.position.set(0, 0, 70);

    const loader = new GCodeLoader();
    loader.load(`../../../assets/gcode/${this.pieza.gcode}`, (object) => {
      object.position.set(-100, -20, 100);
      this.scene?.add(object);
      this.render();
    });

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('change', () => this.render());
    this.controls.minDistance = 10;
    this.controls.maxDistance = 100;

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private onWindowResize(): void {
    if (!this.container) {
      console.error('No se encontró el contenedor con id "pieza"');
      return;
    }
    if (this.camera) {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
    }
    this.renderer?.setSize(this.container.clientWidth, this.container.clientHeight);
    this.render();
  }

  private render(): void {
    if (this.camera && this.scene) {
      this.renderer?.render(this.scene, this.camera);
    }
  }

  private obtenerPieza(): void {
    if (this.idPieza != "") {
      this.apiS.obtenerPiezaId(this.idPieza).subscribe((response) => {
        this.pieza = response;
        // Llamar a initThreeJS después de que la pieza se haya obtenido
        this.initThreeJS();
      });
    }
  }
}
