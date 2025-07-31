import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IntroductionPipesComponent } from './introduction-pipes/introduction-pipes.component';
import { UsingPipesComponent } from './using-pipes/using-pipes.component';
import { ParameterizedPipesComponent } from './parameterized-pipes/parameterized-pipes.component';
import { CustomPipeDemoComponent } from './custom-pipe-demo/custom-pipe-demo.component';
import { ParameterizedCustomPipeComponent } from './parameterized-custom-pipe/parameterized-custom-pipe.component';
import { PureImpurePipesComponent } from './pure-impure-pipes/pure-impure-pipes.component';
import { AsyncPipeDemoComponent } from './async-pipe-demo/async-pipe-demo.component';

@Component({
  selector: 'app-pipes-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IntroductionPipesComponent,
    UsingPipesComponent,
    ParameterizedPipesComponent,
    CustomPipeDemoComponent,
    ParameterizedCustomPipeComponent,
    PureImpurePipesComponent,
    AsyncPipeDemoComponent
  ],
  templateUrl: './pipes-demo.component.html',
  styleUrl: './pipes-demo.component.scss'
})
export class PipesDemoComponent {
  currentTopic: string = 'introduction';

  topics = [
    { id: 'introduction', title: '1. Introduction to Pipes', description: 'Learn what pipes are and their use cases' },
    { id: 'using', title: '2. Using Pipes', description: 'How to use built-in Angular pipes' },
    { id: 'parameterized', title: '3. Parameterized Pipes & Chaining', description: 'Using pipes with parameters and chaining multiple pipes' },
    { id: 'custom', title: '4. Creating Custom Pipes', description: 'How to create your own custom pipes' },
    { id: 'parameterized-custom', title: '5. Parameterizing Custom Pipes', description: 'Creating custom pipes that accept parameters' },
    { id: 'pure-impure', title: '6. Pure and Impure Pipes', description: 'Understanding the difference between pure and impure pipes' },
    { id: 'async', title: '7. Async Pipe', description: 'Working with the async pipe for observables' }
  ];

  selectTopic(topicId: string): void {
    this.currentTopic = topicId;
  }
}
