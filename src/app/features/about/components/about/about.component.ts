import { AfterViewInit, Component, ElementRef, ViewChild, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { gsap } from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

import { ThreeEarthService } from '../../../../core/services/three-earth.service';
import { MessagesService } from '../../../../core/services/messages.service';

import { GridComponent } from '../../../../shared/components/grid/grid.component';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [GridComponent],
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
        this.makeTextVisible();
        this.hasTyped = true;
      }
    }
  }

  private getTitle() {
    return this.messagesService.getAboutTitle();
  }

  private getSubTitle() {
    return this.messagesService.getAboutSubTitle();
  }

  private getText() {
    return this.messagesService.getAboutText();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private makeTextVisible() {
    this.displayTitle = this.getTitle();
    this.displaySubTitle = this.getSubTitle();
    this.displayText = this.getText();
    this.animateText(this.displayTitle, 'title');
    this.animateText(this.displaySubTitle, 'subtitle');
    this.animateText(this.displayText, 'text');
  }

  private animateText(text: string, type: string) {
    const container = this.textSection.nativeElement.querySelector(`.${type}`);
    if (!container) {
      return;
    }
    container.innerHTML = '';
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      container.appendChild(span);
      gsap.to(span, {
        opacity: 1,
        delay: index * 0.04,
        duration: 0.5,
        onComplete: () => {
          if (index === text.length - 1) {
            setTimeout(() => {
              this.makeTextInvisible(container as HTMLElement);
            }, 15000);
          }
        }
      });
    });
  }

  private makeTextInvisible(container: HTMLElement){
    gsap.to(container.children,{
      opacity: 0,
      duration: .5,
      onComplete: ()=>{
        this.makeTextVisible();
      }
    });
  }


}
