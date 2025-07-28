import { Routes } from '@angular/router';
import { HtmlTsCommunicationComponent } from './html-ts-communication/html-ts-communication.component';
import { DirectivesDemoComponent } from './directives-demo/directives-demo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/html-ts-communication', pathMatch: 'full' },
  { path: 'html-ts-communication', component: HtmlTsCommunicationComponent },
  { path: 'directives-demo', component: DirectivesDemoComponent }
];
