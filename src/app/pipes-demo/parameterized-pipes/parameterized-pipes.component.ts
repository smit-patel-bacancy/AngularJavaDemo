import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parameterized-pipes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parameterized-pipes.component.html',
  styleUrl: './parameterized-pipes.component.scss'
})
export class ParameterizedPipesComponent {
  // Sample data
  currentDate = new Date();
  price = 1234.5678;
  percentage = 0.85;
  decimalNumber = 3.14159;
  sampleText = 'Hello World Angular Pipes';
  longText = 'This is a very long text that needs to be truncated for display purposes';
  arrayOfStrings = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape'];

  // Parameters for demonstrations
  dateFormat = 'MM/dd/yyyy';
  currencyCode = 'USD';
  currencyDisplay = 'symbol';
  numberFormat = '1.2-2';
  percentFormat = '1.0-2';
  sliceStart = 0;
  sliceEnd = 3;

  // For chaining examples
  chainingText = 'hello world angular pipes';
  chainingNumber = 1234.5678;
  chainingDate = new Date();

  // Available options for demonstrations
  dateFormats = [
    'short',
    'medium',
    'long',
    'full',
    'MM/dd/yyyy',
    'yyyy-MM-dd',
    'dd/MM/yyyy'
  ];

  currencyCodes = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];
  currencyDisplays = ['code', 'symbol', 'symbol-narrow'];
  numberFormats = ['1.0-0', '1.1-1', '1.2-2', '1.3-3'];
  percentFormats = ['1.0-0', '1.0-1', '1.0-2', '1.0-3'];
}
