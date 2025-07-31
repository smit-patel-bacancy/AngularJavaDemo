import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-introduction-pipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction-pipes.component.html',
  styleUrl: './introduction-pipes.component.scss'
})
export class IntroductionPipesComponent {
  currentDate = new Date();
  sampleText = 'hello world';
  price = 1234.56;
  percentage = 0.85;

  pipeExamples = [
    { name: 'DatePipe', example: '{{ currentDate | date }}', result: this.currentDate.toLocaleDateString() },
    { name: 'UpperCasePipe', example: '{{ sampleText | uppercase }}', result: this.sampleText.toUpperCase() },
    { name: 'LowerCasePipe', example: '{{ sampleText | lowercase }}', result: this.sampleText.toLowerCase() },
    { name: 'CurrencyPipe', example: '{{ price | currency }}', result: this.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
    { name: 'PercentPipe', example: '{{ percentage | percent }}', result: (this.percentage * 100).toFixed(0) + '%' }
  ];
}
