import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


import { typeTextContent } from '../../../../shared/utils/text-typing.util';
import { ThreeService } from '../../../../core/services/three-earth.service';
import { MessagesService } from '../../../../core/services/messages.service';

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
    private threeService: ThreeService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      
    }
  }

  ngAfterViewInit(): void {
    if (this.canvas) {
      const canvasElement: ElementRef<HTMLCanvasElement> = this.canvas;
      this.threeService.init(canvasElement);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const canvasElement = this.canvas.nativeElement;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      // Calcula la posición del canvas basado en el scroll y reduce la velocidad
      const maxScroll = documentHeight - windowHeight;
      const scrollFraction = scrollPosition / maxScroll;
      const canvasWidth = canvasElement.offsetWidth;
      const maxTranslateX = window.innerWidth - canvasWidth;

      // Ajusta la posición del canvas
      const translateX = scrollFraction * maxTranslateX;
      canvasElement.style.transform = `translateX(${translateX}px)`;

      // Detiene el scroll de la página mientras el canvas se mueve
      if (scrollFraction < 1) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'auto';
      }

      if (!this.hasTyped && scrollFraction >= 1) {
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
      await this.delay(600000);
      this.launchTyping();
    });
  }
}
