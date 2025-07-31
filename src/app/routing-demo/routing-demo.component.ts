import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-routing-demo',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './routing-demo.component.html',
  styleUrl: './routing-demo.component.scss'
})
export class RoutingDemoComponent {
  currentPart: 'part1' | 'part2' = 'part1';

  switchPart(part: 'part1' | 'part2'): void {
    this.currentPart = part;
  }
}
