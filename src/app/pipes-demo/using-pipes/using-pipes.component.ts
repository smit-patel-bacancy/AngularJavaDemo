import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-using-pipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './using-pipes.component.html',
  styleUrl: './using-pipes.component.scss'
})
export class UsingPipesComponent {
  // Sample data for demonstrations
  currentDate = new Date();
  sampleText = 'Hello World Angular Pipes';
  price = 1234.5678;
  percentage = 0.85;
  decimalNumber = 3.14159;
  jsonObject = { name: 'John', age: 30, city: 'New York' };
  arrayOfNumbers = [3, 1, 4, 1, 5, 9, 2, 6];
  arrayOfStrings = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
  longText = 'This is a very long text that needs to be truncated for display purposes';

  // For slice pipe demonstration
  sliceStart = 0;
  sliceEnd = 3;

  // For async pipe demonstration
  promiseValue = new Promise<string>((resolve) => {
    setTimeout(() => resolve('Async data loaded!'), 2000);
  });
}
