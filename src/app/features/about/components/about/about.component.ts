import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ThreeService } from '../../../../core/services/three-earth.service';

//Time traveler
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit{
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private threeService: ThreeService) {

  }

  ngAfterViewInit(): void {
    if (this.canvas) {
      const canvasElement: ElementRef<HTMLCanvasElement> = this.canvas;
      this.threeService.init(canvasElement);
    }
  }
}
