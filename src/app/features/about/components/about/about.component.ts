import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { gsap } from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

import { typeTextContent } from '../../../../shared/utils/text-typing.util';
import { ThreeEarthService } from '../../../../core/services/three-earth.service';
import { MessagesService } from '../../../../core/services/messages.service';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('textSection', { static: true }) textSection!: ElementRef<HTMLDivElement>;

  displayTitle: string = '';
  displaySubTitle: string = '';
  displayText: string = '';
  hasTyped: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private messagesService: MessagesService,
    private threeEarthService: ThreeEarthService,
  ) { }


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.canvas) {
        this.threeEarthService.init(this.canvas);
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.hasTyped) {
        this.launchTyping();
        this.hasTyped = true;
      }
    }
  }

  private typeTitle() {
    const title = this.messagesService.getAboutTitle();
    typeTextContent(title, (char) => (this.displayTitle += char), 50);
  }

  private typeSubTitle() {
    const subTitle = this.messagesService.getAboutSubTitle();
    typeTextContent(subTitle, (char) => (this.displaySubTitle += char), 50);
  }

  private typeText(content: string, onComplete?: () => void) {
    typeTextContent(content, (char) => (this.displayText += char), 50, onComplete);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async launchTyping() {
    this.displayTitle = '';
    this.displayText = '';
    this.displaySubTitle = '';
    this.typeTitle();
    await this.delay(500);
    this.typeSubTitle();
    await this.delay(500);
    this.typeText(this.messagesService.getAboutText(), async () => {
      await this.delay(9000);
      this.launchTyping();
    });
  }
}
