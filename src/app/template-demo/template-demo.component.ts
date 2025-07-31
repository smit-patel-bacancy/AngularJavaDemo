import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-demo.component.html',
  styleUrls: ['./template-demo.component.scss']
})
export class TemplateDemoComponent {

  @ViewChild('customTemplate') customTemplate!: TemplateRef<any>;

  items: string[] = ['Apple', 'Banana', 'Orange', 'Mango', 'Grape'];
  showTemplate: boolean = true;
  selectedTemplate: string = 'default';

  user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer'
  };

  // Template context for ng-template
  templateContext = {
    $implicit: 'Default Value',
    customValue: 'Custom Value',
    items: this.items
  };

  toggleTemplate(): void {
    this.showTemplate = !this.showTemplate;
  }

  changeTemplate(template: string): void {
    this.selectedTemplate = template;
  }

  getTemplateContext(): any {
    return {
      $implicit: 'Dynamic Value',
      timestamp: new Date().toLocaleTimeString(),
      user: this.user
    };
  }
}
