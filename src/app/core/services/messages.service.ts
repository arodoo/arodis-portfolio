import { Injectable } from '@angular/core';
import { randomMessages } from '../../shared/utils/messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private title: string = 'Título dinámico';
  private text: string = 'Texto dinámico que se mostrará con animación.';
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
