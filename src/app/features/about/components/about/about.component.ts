import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Inject,
  PLATFORM_ID,
  HostListener
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import AOS from 'aos';


import { typeTextContent } from '../../../../shared/utils/text-typing.util';
import { ThreeService } from '../../../../core/services/three-earth.service';
//Time traveler
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  displayTitle: string = '';
  displayText: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private threeService: ThreeService) {

  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('AOS init');

      AOS.init();
    }
  }


  ngAfterViewInit(): void {
    if (this.canvas) {
      const canvasElement: ElementRef<HTMLCanvasElement> = this.canvas;
      this.threeService.init(canvasElement);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }
  }
}
