import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  // @Input properties with aliasing
  @Input() user: any = {};
  @Input('user-name') userName = 'Default User';
  @Input('user-email') userEmail = 'default@example.com';
  @Input('user-role') userRole = 'User';

  // @Output properties with aliasing
  @Output() userSelect = new EventEmitter<any>();
  @Output('user-delete') userDelete = new EventEmitter<number>();
  @Output('user-edit') userEdit = new EventEmitter<any>();

  // Component state
  isSelected = false;
  lastAction = '';

  // Methods for ViewChild access
  updateUser() {
    this.userName = `Updated User at ${new Date().toLocaleTimeString()}`;
    this.lastAction = 'Updated via ViewChild';
    console.log('User updated via ViewChild');
  }

  getUserInfo() {
    return {
      name: this.userName,
      email: this.userEmail,
      role: this.userRole,
      isSelected: this.isSelected,
      lastAction: this.lastAction
    };
  }

  // Event handlers
  onUserClick() {
    this.isSelected = !this.isSelected;
    this.lastAction = this.isSelected ? 'Selected' : 'Deselected';

    this.userSelect.emit({
      name: this.userName,
      email: this.userEmail,
      role: this.userRole,
      isSelected: this.isSelected
    });
  }

  onDeleteClick() {
    this.userDelete.emit(this.user.id || 0);
    this.lastAction = 'Delete requested';
  }

  onEditClick() {
    this.userEdit.emit({
      name: this.userName,
      email: this.userEmail,
      role: this.userRole
    });
    this.lastAction = 'Edit requested';
  }
}
