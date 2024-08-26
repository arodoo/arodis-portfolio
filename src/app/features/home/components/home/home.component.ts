import { Component } from '@angular/core';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { AboutComponent } from '../../../about/components/about/about.component';
import { TimeLineComponent } from '../../../time-line/components/time-line/time-line.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NavbarComponent, AboutComponent, TimeLineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
