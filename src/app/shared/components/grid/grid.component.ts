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
      console.log('initWaveAnimation');

      const grid = document.querySelector('.grid');
      gsap.to(grid, {
        duration: 20,
        backgroundPosition: '200% 0',
        repeat: -1,
        ease: 'sine.inOut'
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const direction = window.scrollY > this.lastScroll ? 'down' : 'up';
    this.lastScroll = window.scrollY;
    this.updateScrollAnimation(direction);
  }

  updateScrollAnimation(direction: string) {
    const grid = document.querySelectorAll('.grid');
    gsap.to(grid, {
      duration: 1,
      
    });
  }

}
