import { Component } from '@angular/core';
import { Demo1Component } from "./demo1/demo1.component";

@Component({
  selector: 'app-root',
  imports: [
    Demo1Component
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'AngularJavaDemo';
}
