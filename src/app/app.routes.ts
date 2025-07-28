import { Routes } from '@angular/router';
import { Demo1Component } from './demo1/demo1.component';
import { DirectivesDemoComponent } from './directives-demo/directives-demo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/demo1', pathMatch: 'full' },
  { path: 'demo1', component: Demo1Component },
  { path: 'directives-demo', component: DirectivesDemoComponent }
];
