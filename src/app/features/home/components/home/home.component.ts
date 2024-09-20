import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FishesComponent } from '../../../../shared/components/fishes/fishes.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { AboutComponent } from '../../../about/components/about/about.component';

import { ChartsSectionComponent } from '../../../charts/components/charts-section/charts-section.component';

//loading-bar
import { LoadingService } from '../../../../core/services/loading.service';
import { LoadingBarComponent } from '../../../../shared/animations/loading-bar/loading-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoadingBarComponent,
    HeaderComponent, FooterComponent, NavbarComponent,
    AboutComponent, FishesComponent,
  ChartsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadingService.setLoading(false);
    }, 3000);
  }

}
