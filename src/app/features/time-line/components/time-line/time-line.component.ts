import { Component, AfterViewInit, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';


import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.scss'
})
export class TimeLineComponent implements AfterViewInit {
  @ViewChild('timelineContainer', { static: true }) timelineContainer!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {

  }

  timeLineItems = [
    { title: 'Event 1', description: 'Description 1' },
    { title: 'Event 2', description: 'Description 2' },
    { title: 'Event 3', description: 'Description 3' },
    { title: 'Event 4', description: 'Description 4' },
    { title: 'Event 5', description: 'Description 5' },
    { title: 'Event 6', description: 'Description 6' },
    { title: 'Event 7', description: 'Description 7' },
    { title: 'Event 8', description: 'Description 8' },
    { title: 'Event 9', description: 'Description 9' },
    { title: 'Event 10', description: 'Description 10' },
    { title: 'Event 11', description: 'Description 11' },
    { title: 'Event 12', description: 'Description 12' },
    { title: 'Event 13', description: 'Description 13' },
    { title: 'Event 14', description: 'Description 14' },
    { title: 'Event 15', description: 'Description 15' },
    { title: 'Event 16', description: 'Description 16' },
    { title: 'Event 17', description: 'Description 17' },
    { title: 'Event 18', description: 'Description 18' },
    { title: 'Event 19', description: 'Description 19' },
    { title: 'Event 20', description: 'Description 20' },
  ]

  private timeline: gsap.core.Timeline = gsap.timeline();

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.animateTimeline();
    }
  }

  animateTimeline() {
    const totalWidth = this.timelineContainer.nativeElement.scrollWidth;
    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.timelineContainer.nativeElement,
        start: 'top center',
        end: () => `+=${totalWidth - window.innerWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        markers: true,
      },
    });

    this.timeline.to('.timeline-item', {
      x: -totalWidth + window.innerWidth,
      duration: this.timeLineItems.length, 
      ease: 'none',
      });
  }
  /*   animateTimeline() {
      console.log('animateTimeline');
  
      gsap.from('.timeline-item', {
        opacity: 0,
        y: 50,
        stagger: .5,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline',
          start: '100% 80%',
          end: '105% 99%',
          toggleActions: 'play none none reverse',
          markers: true,
        }
      }
      )
    } */
}
