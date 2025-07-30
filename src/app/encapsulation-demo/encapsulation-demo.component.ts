import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encapsulation-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './encapsulation-demo.component.html',
  styleUrl: './encapsulation-demo.component.scss',
  // Demonstrating different encapsulation modes
  encapsulation: ViewEncapsulation.Emulated // Default mode
})
export class EncapsulationDemoComponent {
  encapsulationModes = [
    {
      name: 'Emulated (Default)',
      description: 'Styles are scoped to component but use Angular-generated attributes',
      example: 'ViewEncapsulation.Emulated'
    },
    {
      name: 'None',
      description: 'Styles are global and can affect other components',
      example: 'ViewEncapsulation.None'
    },
    {
      name: 'ShadowDom',
      description: 'Uses Shadow DOM for true encapsulation (if supported)',
      example: 'ViewEncapsulation.ShadowDom'
    }
  ];

  currentMode = 'Emulated';
  demoText = 'This text has component-scoped styles';
  globalText = 'This text uses global styles';

  updateMode(mode: string) {
    this.currentMode = mode;
  }
}
