import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo1',
  imports: [
    FormsModule
  ],
  templateUrl: './demo1.component.html',
  styleUrl: './demo1.component.scss'
})
export class Demo1Component {
  public displayText: string = 'Hello, World 123!';

  public isBtnDisabled: boolean = false;

  public onButtonClick(): void {
    this.isBtnDisabled = true;
    console.log('Button clicked! Disabled state:', this.isBtnDisabled);
    this.displayText = 'Button clicked!';

    setTimeout(() => {
      this.isBtnDisabled = false;
    }, 2000);
  }
}
