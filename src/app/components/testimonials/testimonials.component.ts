// src/app/components/testimonials/testimonials.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TestimonialImage {
  id: number;
  imagePath: string;
  imageAlt: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.scss']
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  @ViewChild('testimonialContainer', { static: false }) containerRef!: ElementRef;

  currentSlide = 0;
  isAutoPlaying = true;
  autoPlayInterval: any;
  touchStartX = 0;
  touchEndX = 0;

  testimonials: TestimonialImage[] = [
    {
      id: 1,
      imagePath: '1.png',
      imageAlt: 'Customer testimonial 1'
    },
    {
      id: 2,
      imagePath: '2.png',
      imageAlt: 'Customer testimonial 2'
    },
    {
      id: 3,
      imagePath: '3.png',
      imageAlt: 'Customer testimonial 3'
    },
    {
      id: 4,
      imagePath: '4.png',
      imageAlt: 'Customer testimonial 4'
    },
    {
      id: 5,
      imagePath: '5.png',
      imageAlt: 'Customer testimonial 5'
    }
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      if (this.isAutoPlaying) {
        this.nextSlide();
      }
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  pauseAutoPlay() {
    this.isAutoPlaying = false;
  }

  resumeAutoPlay() {
    this.isAutoPlaying = true;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.testimonials.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.pauseAutoPlay();
    setTimeout(() => this.resumeAutoPlay(), 3000);
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.pauseAutoPlay();
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
    setTimeout(() => this.resumeAutoPlay(), 1000);
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }
}