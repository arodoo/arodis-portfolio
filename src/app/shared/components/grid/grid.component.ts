import { AfterViewInit, Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { gsap } from 'gsap';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements AfterViewInit {

  squares = Array(30).fill(0);
  lastScroll = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    this.initWaveAnimation();
  }

  initWaveAnimation() {
    if (isPlatformBrowser(this.platformId)) {

      const squares = document.querySelectorAll('.square');
      gsap.to(squares, {
        duration: 2,
        backgroundPosition: '200% 0',
        repeat: -1,
        ease: 'linear'
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const direction = window.scrollY > this.lastScroll ? 'down' : 'up';
      this.lastScroll = window.scrollY;
      this.updateScrollAnimation(direction);
    }
  }

  updateScrollAnimation(direction: string) {
    const squares = document.querySelectorAll('.square');
    gsap.to(squares, {
      duration: 1,
      y: direction === 'down' ? 20 : -20,
      ease: 'bounce'
    });
  }

}
