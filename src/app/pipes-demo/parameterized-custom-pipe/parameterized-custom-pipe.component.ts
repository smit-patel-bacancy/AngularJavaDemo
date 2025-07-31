import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParameterizedCustomPipePipe } from '../parameterized-custom-pipe.pipe';

@Component({
  selector: 'app-parameterized-custom-pipe',
  standalone: true,
  imports: [CommonModule, FormsModule, ParameterizedCustomPipePipe],
  templateUrl: './parameterized-custom-pipe.component.html',
  styleUrl: './parameterized-custom-pipe.component.scss'
})
export class ParameterizedCustomPipeComponent {
  sampleText = 'hello world';
  userInput = '';
  prefix = 'Custom';
  suffix = '!';

  // Examples for demonstration
  examples = [
    {
      input: 'hello world',
      prefix: 'Info',
      suffix: '',
      description: 'Basic parameterized transformation'
    },
    {
      input: 'angular pipes',
      prefix: 'Warning',
      suffix: '!!!',
      description: 'With warning prefix and suffix'
    },
    {
      input: 'important message',
      prefix: 'Error',
      suffix: ' [URGENT]',
      description: 'Error prefix with urgent suffix'
    },
    {
      input: 'success',
      prefix: 'Success',
      suffix: ' ✓',
      description: 'Success prefix with checkmark'
    }
  ];
}
