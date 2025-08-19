import { Component } from '@angular/core';
import { ChildDemoComponent } from './child-demo/child-demo.component';
export interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildDemoComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];
  selectedUser: User | null = null;
  updatedUser: User | null = null;

  selectUser(user: User): void {
    this.selectedUser = { ...user };
    this.updatedUser = null;
  }

  handleUserUpdate(user: User): void {
    this.updatedUser = user;
    this.users = this.users.map((u) => (u.id === user.id ? user : u));
  }
}
