import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { gsap } from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

import { typeTextContent } from '../../../../shared/utils/text-typing.util';
import { ThreeEarthService } from '../../../../core/services/three-earth.service';
import { MessagesService } from '../../../../core/services/messages.service';
//import { GsapService } from '../../../../core/services/gsap.service';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnInit {
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
    //private gsapService: GsapService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.canvas) {
        const canvasElement = this.canvas.nativeElement;
        this.threeEarthService.init(this.canvas);

        gsap.to('.square', {
          
          scrollTrigger: {
            trigger: '.square',
            start: 'center 75%',
            end: 'bottom 85%',
            scrub: true,
            pin: true,
            markers: true,
            onEnter: () => { document.body.style.overflow = 'hidden'; },
            onLeave: () => { document.body.style.overflow = 'auto'; },
            onEnterBack: () => { document.body.style.overflow = 'hidden'; },
            onLeaveBack: () => { document.body.style.overflow = 'auto'; }
          },
          x: '100%',
        });
      }
    }
  }

  animateEarthCanvas(canvasElement: HTMLElement): void {
    
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
      await this.delay(6000);
      this.launchTyping();
    });
  }
}
