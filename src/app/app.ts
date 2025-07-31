import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'AngularJavaDemo';

  // Navigation state
  protected activeDropdown: string | null = null;
  protected isMobileMenuOpen = false;

  // Toggle dropdown menu
  protected toggleDropdown(dropdownName: string): void {
    if (this.activeDropdown === dropdownName) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = dropdownName;
    }
  }

  // Close all dropdowns
  protected closeDropdowns(): void {
    this.activeDropdown = null;
  }

  // Toggle mobile menu
  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Close mobile menu
  protected closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
