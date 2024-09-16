import { Component, Input, AfterViewInit, ElementRef, Renderer2, OnInit } from '@angular/core';


//gsap.registerPlugin(TextPlugin);
@Component({
  selector: 'app-text-overlay',
  standalone: true,
  imports: [],
  templateUrl: './text-overlay.component.html',
  styleUrl: './text-overlay.component.scss'
})
export class TextOverlayComponent implements AfterViewInit, OnInit {

  @Input() text: string = '';
  @Input() fontSize: string = '16px';
  @Input() color: string = '#000';
  @Input() fontFamily: string = 'Arial';
  @Input() top: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    //this.setStyle();
    //this.animateText();
  }

  private setStyle(): void {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', this.fontSize);
    this.renderer.setStyle(this.el.nativeElement, 'color', this.color);
    this.renderer.setStyle(this.el.nativeElement, 'font-family', this.fontFamily);
    this.renderer.setStyle(this.el.nativeElement, 'top', this.top);
  }


  private animateText(): void {

  }
}
