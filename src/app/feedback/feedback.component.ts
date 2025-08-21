import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  currentIndex = 0;
  cardWidth = 0;
  totalCards = 0;

  ngAfterViewInit() {
    const container = this.scrollContainer.nativeElement;

    // Get first card wrapper (col)
    const firstCol = container.querySelector('div.col-md-6');
    if (firstCol) {
      const style = window.getComputedStyle(container);
      const gap = parseInt(style.gap || '0', 10);
      this.cardWidth = firstCol.offsetWidth + gap;
    }

    // Count all card wrappers
    this.totalCards = container.querySelectorAll('div.col-md-6').length;

    // Auto scroll every 10 seconds
    setInterval(() => {
      this.autoScroll();
    }, 2000);
  }

  autoScroll() {
    const container = this.scrollContainer.nativeElement;

    this.currentIndex++;
    if (this.currentIndex >= this.totalCards) {
      this.currentIndex = 0;
    }

    container.scrollTo({
      left: this.currentIndex * this.cardWidth,
      behavior: 'smooth'
    });
  }
}
