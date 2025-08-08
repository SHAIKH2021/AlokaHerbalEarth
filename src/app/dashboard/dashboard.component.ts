import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { ProductsComponent } from "../products/products.component";
import { ContactComponent } from "../contact/contact.component";
import { ProductBenefitsComponent } from "../product-benefits/product-benefits.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductDetailsComponent, ProductsComponent, ContactComponent, ProductBenefitsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('track') track!: ElementRef;
  @ViewChild('slider') slider!: ElementRef;

  index = 0;
  totalImages = 3;
  autoSlideInterval: any;

  ngAfterViewInit(): void {
    this.startAutoSlide();

    // Pause on hover
    this.slider.nativeElement.addEventListener('mouseenter', () => clearInterval(this.autoSlideInterval));
    this.slider.nativeElement.addEventListener('mouseleave', () => this.startAutoSlide());
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide(); // auto always moves forward
    }, 3000);
  }

  showImage(instantJump = false) {
  const trackEl = this.track.nativeElement;
  const imgWidth = this.track.nativeElement.querySelector('img').clientWidth; // Dynamic width

  if (instantJump) {
    trackEl.style.transition = 'none';
    trackEl.style.transform = `translateX(-${this.index * imgWidth}px)`;

    // Re-enable transition after jump
    setTimeout(() => {
      trackEl.style.transition = 'transform 0.5s ease-in-out';
    }, 20);
  } else {
    trackEl.style.transition = 'transform 0.5s ease-in-out';
    trackEl.style.transform = `translateX(-${this.index * imgWidth}px)`;
  }
}



  nextSlide() {
  // Normal forward slide
  if (this.index === this.totalImages - 1) {
    this.index = 0;
    this.showImage(true); // Jump instantly when looping
  } else {
    this.index++;
    this.showImage();
  }
}

prevSlide() {
  // Normal backward slide
  if (this.index === 0) {
    this.index = this.totalImages - 1;
    this.showImage(true); // Jump instantly when looping
  } else {
    this.index--;
    this.showImage();
  }
}


  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval);
  }
}
