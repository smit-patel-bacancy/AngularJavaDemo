import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.scss'
})
export class HeaderComponentComponent {
  // @Input properties with aliasing
  @Input() headerTitle = 'Default Header';
  @Input('header-subtitle') headerSubtitle = 'Default Subtitle';
  @Input('header-data') headerData: any = {};

  // @Output properties with aliasing
  @Output() headerClick = new EventEmitter<string>();
  @Output('header-selected') headerSelected = new EventEmitter<any>();

  // Component state
  clickCount = 0;
  lastUpdate = new Date();

  // Methods for ViewChild access
  updateHeader() {
    this.headerTitle = `Updated Header at ${new Date().toLocaleTimeString()}`;
    this.lastUpdate = new Date();
    console.log('Header updated via ViewChild');
  }

  getHeaderInfo() {
    return {
      title: this.headerTitle,
      subtitle: this.headerSubtitle,
      clickCount: this.clickCount,
      lastUpdate: this.lastUpdate
    };
  }

  // Event handlers
  onHeaderClick() {
    this.clickCount++;
    const message = `Header clicked ${this.clickCount} times`;
    this.headerClick.emit(message);
    this.headerSelected.emit({
      title: this.headerTitle,
      clickCount: this.clickCount,
      timestamp: new Date()
    });
  }

  onSubtitleClick() {
    const message = `Subtitle clicked: ${this.headerSubtitle}`;
    this.headerClick.emit(message);
  }
}
