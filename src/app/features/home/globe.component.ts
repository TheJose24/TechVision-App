import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { InViewDirective } from '../../shared/directives/in-view.directive';

interface Office {
  lat: number;
  lng: number;
  name: string;
  size: number;
}

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

@Component({
  selector: 'app-globe',
  standalone: true,
  imports: [CommonModule, InViewDirective],
  template: `
    <div #container class="h-screen w-full" appInView (inView)="handleVisibilityChange($event)">
      <canvas #canvas class="h-full w-full"></canvas>
    </div>
  `,
})
export class GlobeComponent implements OnInit, OnDestroy {
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private globe!: ThreeGlobe;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: TrackballControls;
  private animationFrameId: number | null = null;
  private resizeObserver?: ResizeObserver;

  private isVisible = true;
  private readonly OFFICES: Office[] = [
    { lat: 40.7128, lng: -74.006, name: 'Nueva York', size: 1.2 },
    { lat: 51.5074, lng: -0.1278, name: 'Londres', size: 1 },
    { lat: -34.6037, lng: -58.3816, name: 'Buenos Aires', size: 1 },
    { lat: 35.6762, lng: 139.6503, name: 'Tokyo', size: 1.1 },
    { lat: 25.2048, lng: 55.2708, name: 'Dubai', size: 0.9 },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    setTimeout(() => this.initGlobe(), 0);
  }

  private async initGlobe(): Promise<void> {
    try {
      await this.setupScene();
      await this.loadGlobeData();
      this.setupResizeHandler();
      this.animate();
    } catch (error) {
      console.error('Error initializing globe:', error);
    }
  }

  private async setupScene(): Promise<void> {
    const canvas = this.canvasRef.nativeElement;

    // Configurar renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.updateSize();

    // Configurar escena
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0x444444, Math.PI));
    this.scene.add(new THREE.DirectionalLight(0x6366f1, 0.8 * Math.PI));

    // Configurar cámara
    this.camera = new THREE.PerspectiveCamera(80, this.getAspectRatio(), 0.1, 1000);
    this.camera.position.z = 220;

    // Configurar controles
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 0.5;
    this.controls.zoomSpeed = 0;
    this.controls.noZoom = true;
  }

  private async loadGlobeData(): Promise<void> {
    const countries = await this.http
      .get<{ features: object[] }>('/assets/countries.geojson')
      .toPromise();

    this.globe = new ThreeGlobe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .hexPolygonsData(countries?.features || [])
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .hexPolygonColor(() => '#ffffff')
      .showAtmosphere(true)
      .atmosphereColor('#6366f1')
      .atmosphereAltitude(0.15)
      .arcsData(this.generateArcsData())
      .arcColor((d: object) => (d as ArcData).color)
      .arcDashLength(0.4)
      .arcDashGap(4)
      .arcDashInitialGap(2)
      .arcDashAnimateTime(1500)
      .arcStroke(0.5)
      .ringsData(this.generateRingsData())
      .ringColor(() => 'rgba(99, 102, 241, 0.3)')
      .ringMaxRadius('maxR')
      .ringPropagationSpeed('propagationSpeed')
      .ringRepeatPeriod('repeatPeriod')
      .labelsData(this.generateLabelsData())
      .labelSize(2)
      .labelText('text')
      .labelColor(() => 'white')
      .labelDotRadius(0.5)
      .labelAltitude(0.01)
      .pointsData(this.generatePointsData())
      .pointColor(() => '#6366f1')
      .pointsMerge(true)
      .pointAltitude(0.07)
      .pointRadius(0.05)
      .globeMaterial(
        new THREE.MeshPhongMaterial({
          color: 0x1e1b4b,
          emissive: 0x6366f1,
          emissiveIntensity: 0.1,
          shininess: 0.5,
        })
      );

    this.scene.add(this.globe);
  }

  private setupResizeHandler(): void {
    this.resizeObserver = new ResizeObserver(entries => {
      if (!entries.length) return;
      this.updateSize();
    });

    this.resizeObserver.observe(this.containerRef.nativeElement);
  }

  private updateSize(): void {
    const container = this.containerRef.nativeElement;
    const { clientWidth, clientHeight } = container;
    const pixelRatio = window.devicePixelRatio;

    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(clientWidth, clientHeight);

    if (this.camera) {
      this.camera.aspect = this.getAspectRatio();
      this.camera.updateProjectionMatrix();
    }
  }

  private getAspectRatio(): number {
    const container = this.containerRef.nativeElement;
    return container.clientWidth / container.clientHeight;
  }

  private generateArcsData(): {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color: string;
  }[] {
    const arcs = [];
    // Conectar cada oficina con otras dos oficinas aleatorias
    for (const office of this.OFFICES) {
      const connectedOffices = this.OFFICES.filter(o => o !== office)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

      for (const target of connectedOffices) {
        arcs.push({
          startLat: office.lat,
          startLng: office.lng,
          endLat: target.lat,
          endLng: target.lng,
          color: 'rgba(99, 102, 241, 0.5)',
        });
      }
    }
    return arcs;
  }

  private generateRingsData(): {
    lat: number;
    lng: number;
    maxR: number;
    propagationSpeed: number;
    repeatPeriod: number;
  }[] {
    return this.OFFICES.map(office => ({
      lat: office.lat,
      lng: office.lng,
      maxR: 15 * office.size,
      propagationSpeed: 2,
      repeatPeriod: 2000,
    }));
  }

  private generateLabelsData(): { lat: number; lng: number; text: string; size: number }[] {
    return this.OFFICES.map(office => ({
      lat: office.lat,
      lng: office.lng,
      text: office.name,
      size: office.size,
    }));
  }

  private generatePointsData(): { lat: number; lng: number }[] {
    // Generar 100 puntos aleatorios para representar la presencia digital global
    return Array.from({ length: 100 }, () => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
    }));
  }

  handleVisibilityChange(isVisible: boolean): void {
    this.isVisible = isVisible;
    if (isVisible) {
      // Reiniciar la animación si estaba parada
      if (!this.animationFrameId) {
        this.animate();
      }
    } else {
      // Detener la animación si no está visible
      if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
  }

  private animate(): void {
    if (!this.isVisible) return;
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    // Rotación suave del globo
    if (this.globe?.rotation instanceof THREE.Euler) {
      this.globe.rotation.y += 0.0005;
    } else {
      console.warn('La rotación no está disponible.');
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.resizeObserver?.disconnect();
    this.controls?.dispose();
    this.renderer?.dispose();

    this.scene?.traverse(object => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }
}
