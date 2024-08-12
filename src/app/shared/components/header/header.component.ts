import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ThreeLucyService } from '../../../core/services/three-lucy.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private threeLucyService: ThreeLucyService) { }

  ngAfterViewInit(): void {
    if (this.canvas) {
      const canvasElement: ElementRef<HTMLCanvasElement> = this.canvas;
      this.threeLucyService.init(canvasElement);

    }
  }
}
