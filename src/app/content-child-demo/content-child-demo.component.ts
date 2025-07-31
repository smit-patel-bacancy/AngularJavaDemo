import { Component, ContentChild, AfterContentInit, AfterContentChecked, ElementRef, TemplateRef, ViewChild, QueryList, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-child-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-child-demo.component.html',
  styleUrls: ['./content-child-demo.component.scss']
})
export class ContentChildDemoComponent implements AfterContentInit, AfterContentChecked {

  @ContentChild('projectedContent') projectedContent!: ElementRef;
  @ContentChild('templateContent') templateContent!: TemplateRef<any>;
  @ContentChildren('multipleContent') multipleContent!: QueryList<ElementRef>;

  @ViewChild('viewChildElement') viewChildElement!: ElementRef;

  contentLogs: string[] = [];
  showContent: boolean = true;
  showTemplate: boolean = true;

  ngAfterContentInit(): void {
    this.logContent('ngAfterContentInit called');

    if (this.projectedContent) {
      this.logContent(`ContentChild found: ${this.projectedContent.nativeElement.textContent}`);
    }

    if (this.templateContent) {
      this.logContent('TemplateRef content found');
    }

    if (this.multipleContent) {
      this.logContent(`Found ${this.multipleContent.length} multiple content elements`);
    }
  }

  ngAfterContentChecked(): void {
    this.logContent('ngAfterContentChecked called');
  }

  private logContent(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    this.contentLogs.unshift(logMessage);

    // Keep only last 15 logs
    if (this.contentLogs.length > 15) {
      this.contentLogs = this.contentLogs.slice(0, 15);
    }
  }

  toggleContent(): void {
    this.showContent = !this.showContent;
  }

  toggleTemplate(): void {
    this.showTemplate = !this.showTemplate;
  }

  clearLogs(): void {
    this.contentLogs = [];
  }
}
