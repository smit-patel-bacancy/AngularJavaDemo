import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-styling-links',
  standalone: true,
  imports: [],
  templateUrl: './styling-links.component.html',
  styleUrl: './styling-links.component.scss'
})
export class StylingLinksComponent {

  // Example data for demonstration
  isActive: boolean = false;
  currentTheme: string = 'light';
  isMobile: boolean = false;

  constructor(private router: Router) {
    this.checkDeviceType();
  }

  // Example styling methods
  toggleActiveState() {
    this.isActive = !this.isActive;
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }

  private checkDeviceType() {
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }

  private applyTheme() {
    document.body.setAttribute('data-theme', this.currentTheme);
  }

  // Example navigation methods
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  // Example styling utility methods
  getActiveClass(isActive: boolean): string {
    return isActive ? 'active' : '';
  }

  getButtonClass(): string {
    return `nav-btn ${this.isActive ? 'active' : ''}`;
  }

  getGradientClass(): string {
    return `gradient-btn ${this.currentTheme}`;
  }

  getResponsiveClass(): string {
    return `nav-link ${this.isMobile ? 'mobile' : 'desktop'}`;
  }

  // Example CSS variable management
  updateCSSVariables(theme: string) {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.style.setProperty('--nav-bg', '#2c3e50');
      root.style.setProperty('--nav-text', '#ecf0f1');
      root.style.setProperty('--nav-hover', '#34495e');
    } else {
      root.style.setProperty('--nav-bg', '#ffffff');
      root.style.setProperty('--nav-text', '#2c3e50');
      root.style.setProperty('--nav-hover', '#f8f9fa');
    }
  }

  // Example animation methods
  addHoverAnimation(element: HTMLElement) {
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'translateY(-2px)';
      element.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translateY(0)';
      element.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    });
  }

  addUnderlineAnimation(element: HTMLElement) {
    element.addEventListener('mouseenter', () => {
      const underline = element.querySelector('.underline') as HTMLElement;
      if (underline) {
        underline.style.width = '100%';
      }
    });

    element.addEventListener('mouseleave', () => {
      const underline = element.querySelector('.underline') as HTMLElement;
      if (underline) {
        underline.style.width = '0%';
      }
    });
  }

  // Example responsive navigation
  toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;
    if (mobileMenu) {
      mobileMenu.classList.toggle('open');
    }
  }

  closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
    }
  }

  // Example accessibility methods
  addAccessibilityFeatures() {
    const links = document.querySelectorAll('a[routerLink]');

    links.forEach(link => {
      // Add ARIA labels
      if (!link.getAttribute('aria-label')) {
        const text = link.textContent?.trim();
        link.setAttribute('aria-label', text || 'Navigation link');
      }

      // Add keyboard navigation
      link.addEventListener('keydown', (event: Event) => {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
          event.preventDefault();
          (link as HTMLElement).click();
        }
      });
    });
  }

  // Example performance optimization
  optimizeLinkRendering() {
    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => observer.observe(link));
  }

  // Example state management
  updateLinkState(linkId: string, isActive: boolean) {
    const link = document.getElementById(linkId);
    if (link) {
      if (isActive) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  }

  // Example dynamic styling
  applyDynamicStyles(linkElement: HTMLElement, styles: any) {
    Object.keys(styles).forEach(property => {
      linkElement.style[property as any] = styles[property];
    });
  }

  // Example theme switching
  switchToTheme(themeName: string) {
    this.currentTheme = themeName;
    this.updateCSSVariables(themeName);
    this.applyTheme();
  }

  // Example responsive breakpoint handling
  getResponsiveClassForBreakpoint(breakpoint: string): string {
    const width = window.innerWidth;

    switch (breakpoint) {
      case 'mobile':
        return width < 768 ? 'mobile-nav' : '';
      case 'tablet':
        return width >= 768 && width < 1024 ? 'tablet-nav' : '';
      case 'desktop':
        return width >= 1024 ? 'desktop-nav' : '';
      default:
        return '';
    }
  }

  // Example animation timing
  setAnimationTiming(duration: number, easing: string) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      (link as HTMLElement).style.transition = `all ${duration}ms ${easing}`;
    });
  }

  // Example color scheme management
  updateColorScheme(scheme: 'primary' | 'secondary' | 'accent') {
    const root = document.documentElement;

    switch (scheme) {
      case 'primary':
        root.style.setProperty('--primary-color', '#007bff');
        root.style.setProperty('--secondary-color', '#6c757d');
        break;
      case 'secondary':
        root.style.setProperty('--primary-color', '#28a745');
        root.style.setProperty('--secondary-color', '#ffc107');
        break;
      case 'accent':
        root.style.setProperty('--primary-color', '#dc3545');
        root.style.setProperty('--secondary-color', '#17a2b8');
        break;
    }
  }
}
