import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomPipePipe } from '../custom-pipe.pipe';

@Component({
  selector: 'app-custom-pipe-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomPipePipe],
  templateUrl: './custom-pipe-demo.component.html',
  styleUrl: './custom-pipe-demo.component.scss'
})
export class CustomPipeDemoComponent {
  sampleText = 'hello world';
  userInput = '';

  // Examples for demonstration
  examples = [
    { input: 'hello world', description: 'Basic text transformation' },
    { input: 'angular pipes', description: 'Multiple words' },
    { input: 'UPPERCASE TEXT', description: 'Already uppercase text' },
    { input: 'mixed Case Text', description: 'Mixed case text' },
    { input: '', description: 'Empty string' }
  ];
}
