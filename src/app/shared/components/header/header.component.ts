import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ThreeLucyService } from '../../../core/services/three-js/three-lucy.service';
import { ThreeSharkServiceService } from '../../../core/services/three-js/three-shark-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  constructor(private threeLucyService: ThreeLucyService,
    private threeSharkServiceService: ThreeSharkServiceService
  ) { }

  ngAfterViewInit(): void {
    this.threeSharkServiceService.init(this.containerRef);
  }
}
