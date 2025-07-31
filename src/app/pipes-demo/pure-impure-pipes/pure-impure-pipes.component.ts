import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurePipePipe } from '../pure-pipe.pipe';
import { ImpurePipePipe } from '../impure-pipe.pipe';

@Component({
  selector: 'app-pure-impure-pipes',
  standalone: true,
  imports: [CommonModule, FormsModule, PurePipePipe, ImpurePipePipe],
  templateUrl: './pure-impure-pipes.component.html',
  styleUrl: './pure-impure-pipes.component.scss'
})
export class PureImpurePipesComponent {
  sampleText = 'hello world';
  counter = 0;

  // For demonstrating change detection
  triggerChangeDetection() {
    this.counter++;
    console.log('Change detection triggered, counter:', this.counter);
  }

  // Examples for demonstration
  examples = [
    { text: 'pure pipe example', description: 'Pure pipe - only executes when input changes' },
    { text: 'impure pipe example', description: 'Impure pipe - executes on every change detection' },
    { text: 'another example', description: 'Another example to test' }
  ];
}
