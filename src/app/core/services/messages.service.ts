import { Injectable } from '@angular/core';
import { randomMessages } from '../../shared/utils/messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private title: string = 'Hi, my name is Emmanuel.';
  private text: string = 'And I am searching for a fun way to spend my life.';
  private randomMessages: string[] = randomMessages;

  getTitle(): string {
    return this.title;
  }

  getText(): string {
    return this.text;
  }

  getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.randomMessages.length);
    return this.randomMessages[randomIndex];
  }

  constructor() { }
}
