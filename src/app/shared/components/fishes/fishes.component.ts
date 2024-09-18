import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ThreeAnimatedFishesService } from '../../../core/services/three-js/three-animated-fishes.service';

@Component({
  selector: 'app-fishes',
  standalone: true,
  imports: [],
  templateUrl: './fishes.component.html',
  styleUrl: './fishes.component.scss'
})
export class FishesComponent implements OnInit{
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  constructor(private threeAnimatedFishesService: ThreeAnimatedFishesService) {}

  ngOnInit() {
    this.threeAnimatedFishesService.init(this.containerRef);
  }
}
