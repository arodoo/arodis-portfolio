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


/*     gsap.to(canvasElement, {
      x: '100vw',
      ScrollTrigger: {
        trigger: canvasElement,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        pin: true,
        markers: true,
        onEnter: () => { document.body.style.overflow = 'hidden'; },
        onLeave: () => { document.body.style.overflow = 'auto'; },
        onEnterBack: () => { document.body.style.overflow = 'hidden'; },
        onLeaveBack: () => { document.body.style.overflow = 'auto'; }
      }
    }); */
  }
}

