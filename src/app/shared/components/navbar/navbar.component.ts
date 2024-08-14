import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Input() title: string = '';
  @Input() text: string = '';
  displayTitle: string = '';
  displayText: string = '';

  ngOnInit() {
    this.typeTitle();
    this.typeText();
  }

  typeTitle() {
    let i = 0;
    const interval = setInterval(() => {
      if (i < this.title.length) {
        this.displayTitle += this.title.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }

  typeText() {
    let i = 0;
    const interval = setInterval(() => {
      if (i < this.text.length) {
        this.displayText += this.text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }
}
