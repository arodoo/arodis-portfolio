import { Injectable, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

@Injectable({
  providedIn: 'root'
})
export class ThreeSharkServiceService {

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private clock = new THREE.Clock();
  private mixer!: THREE.AnimationMixer;
  private sharkModel!: THREE.Group;

  constructor(@Inject(PLATFORM_ID) private platformID: Object) { }

  init(container: ElementRef<HTMLDivElement>): void {
    if (isPlatformBrowser(this.platformID)) {
      this.setupRender(container);
      this.setupScene();
      this.setupCamera();
      this.setupLighting();
      this.loadModel();
      this.addEventListeners();
      this.animate();
    }
  }

  private loadModel(): void {
    const loader = new GLTFLoader();
    loader.load('models/glb/binary/megalodon.glb', (gltf) => {
      this.sharkModel = gltf.scene;
      this.sharkModel.position.set(-30, -30, 0)
      this.sharkModel.rotation.y = Math.PI / 2;
      this.sharkModel.rotation.x = (Math.PI / 2);
      this.scene.add(this.sharkModel);

      // Exponer el modelo globalmente
/*       (window as any).sharkModel = this.sharkModel; */

      this.setUpAnimation(gltf.animations);
    }, undefined, (error) => {
      console.error(error);
    });
  }

  private setUpAnimation(animations: THREE.AnimationClip[]): void {
    this.mixer = new THREE.AnimationMixer(this.sharkModel);
    animations.forEach((clip) => {
      const actions = this.mixer.clipAction(clip);
      actions.loop = THREE.LoopRepeat;
      actions.clampWhenFinished = true;
      actions.play();
    })
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    const delta = this.clock.getDelta();
    if (this.mixer) {
      this.mixer.update(delta);
    }
    this.renderer.render(this.scene, this.camera);
  }

  private setupRender(container: ElementRef<HTMLDivElement>): void {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.nativeElement.appendChild(this.renderer.domElement);
  }

  private setupScene(): void {
    this.scene = new THREE.Scene();
    //this.scene.background = new THREE.Color(0x000000);
  }

  private setupCamera(): void {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(-30, -50, 220);
    (window as any).camera = this.camera;
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5).normalize();
    this.scene.add(directionalLight);
  }

  private addEventListeners(): void {
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private onWindowResize(): void {
    if (isPlatformBrowser(this.platformID)) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
