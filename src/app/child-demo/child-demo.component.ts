import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../app';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child-demo',
  templateUrl: './child-demo.component.html',
  styleUrls: ['./child-demo.component.scss'],
  imports: [FormsModule],
})

export class ChildDemoComponent {
  @Input() user: User | null = null;
  @Output() userUpdate = new EventEmitter<User>();

  updateUser() {
    if (this.user) {
      this.userUpdate.emit({ ...this.user });
    }
  }
}
