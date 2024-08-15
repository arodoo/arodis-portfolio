import { Component, Input, OnInit } from '@angular/core';
import { typeTextContent } from '../../utils/text-typing.util';

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
    this.launchTyping();
  }

  private typeTitle() {
    typeTextContent(this.title, (char) => this.displayTitle += char, 50);
  }

  private typeText() {
    typeTextContent(this.text, (char) => this.displayText += char, 50);
  }

  //function to launch text typing
  async launchTyping() {
    this.displayTitle = '';
    this.displayText = '';
    this.typeTitle();
    await this.delay(1800);
    this.typeText();
  }

  //function to make a delay
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
