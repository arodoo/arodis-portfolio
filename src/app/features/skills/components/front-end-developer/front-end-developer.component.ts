import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ThreeSharkServiceService } from '../../../../core/services/three-shark-service.service';
import * as THREE from 'three';

@Component({
  selector: 'app-front-end-developer',
  standalone: true,
  imports: [],
  templateUrl: './front-end-developer.component.html',
  styleUrl: './front-end-developer.component.scss'
})
export class FrontEndDeveloperComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  constructor(private threeSharkServiceService: ThreeSharkServiceService) { }

  ngAfterViewInit(): void {
    this.threeSharkServiceService.init(this.containerRef);
  }

}
