import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-routing-demo',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './routing-demo.component.html',
  styleUrl: './routing-demo.component.scss'
})
export class RoutingDemoComponent {

}
