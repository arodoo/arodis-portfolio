import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThreeSharkServiceService } from '../../../core/services/three-js/three-shark-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  constructor(private threeSharkServiceService: ThreeSharkServiceService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
    this.threeSharkServiceService.init(this.containerRef);
    }, 1000);
  }
}
