import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { typeTextContent } from '../../utils/text-typing.util';
import { MessagesService } from '../../../core/services/messages.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit {
  displayTitle: string = '';
  displayText: string = '';

  constructor(private messagesService: MessagesService) {

    
  }

  ngAfterViewInit() {
    this.launchTyping();
  }

  private typeTitle() {
    const title = this.messagesService.getTitle();
    typeTextContent(title, (char) => (this.displayTitle += char), 50);
  }


  private typeText(content: string, onComplete?: () => void) {
    typeTextContent(content, (char) => (this.displayText += char), 50, onComplete);
  }


  //function to launch text typing
  async launchTyping() {
    this.displayTitle = '';
    this.displayText = '';
    this.typeTitle();
    await this.delay(1800);
    this.typeText(this.messagesService.getText(), () => this.startClientLoop());
  }

  //function to make a delay
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private startClientLoop() {
    if (typeof window !== 'undefined') {
      this.loopRandomMessages();
    }
  }

  private loopRandomMessages() {
    setTimeout(async () => {
      this.displayText = '';
      const randomMessage = this.messagesService.getRandomMessage();
      this.typeText(randomMessage, () => this.loopRandomMessages());
    }, 3500);
  }
}
