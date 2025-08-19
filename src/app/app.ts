import { Component } from '@angular/core';
import { ChildDemoComponent } from './child-demo/child-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildDemoComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  parentMessage = 'Hello from Parent!';
  childResponse = '';

  receiveMessage(event: string) {
    this.childResponse = event;
  }
}
