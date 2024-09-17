import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextOverlayComponent } from '../text-overlay/text-overlay.component';
import { ScrollTrigger } from 'gsap/all';

import { ThreeSharkServiceService } from '../../../../core/services/three-js/three-shark-service.service';


@Component({
  selector: 'app-front-end-developer',
  standalone: true,
  imports: [CommonModule,
    TextOverlayComponent],
  templateUrl: './front-end-developer.component.html',
  styleUrl: './front-end-developer.component.scss'
})
export class FrontEndDeveloperComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  
  textOverlays = [
    { text: 'Texto dinámico 1', fontSize: '20px', color: 'black', top: 20 },
    { text: 'Texto dinámico 2', fontSize: '30px', color: 'red', top: 80 }
  ];

  constructor(private threeSharkServiceService: ThreeSharkServiceService) { }


  ngAfterViewInit(): void {
    this.threeSharkServiceService.init(this.containerRef);
  }

}
