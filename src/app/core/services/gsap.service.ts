import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
@Injectable({
  providedIn: 'root'
})
export class GsapService {

  constructor() {

  }
  animateEarthCanvas(canvasElement: HTMLElement): void {

  }
}

