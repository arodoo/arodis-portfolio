import { Injectable } from '@angular/core';
import { randomMessages } from '../../shared/utils/messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private navBartitle: string = 'Hi, my name is Emmanuel';
  private navBartext: string = 'And I am searching for a fun way to spend my life.';

  private aboutTitle: string = 'Time traveler';
  private aboutSubTitle: string = 'Space explorer';
  private aboutText: string = '“What is this life? A frenzy, an illusion, a shadow, a delirium, a fiction. The greatest good’s but little, and this life is but a dream, and dreams are only dreams.”';

  private randomMessages: string[] = randomMessages;

  getNavBarTitle(): string {
    return this.navBartitle;
  }

  getNavBarText(): string {
    return this.navBartext;
  }

  getAboutTitle(): string {
    return this.aboutTitle;
  }

  getAboutText(): string {
    return this.aboutText;
  }

  getAboutSubTitle(): string {
    return this.aboutSubTitle;
  }

  getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.randomMessages.length);
    return this.randomMessages[randomIndex];
  }

  constructor() { }
}
