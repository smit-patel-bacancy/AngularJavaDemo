import { Routes } from '@angular/router';
import { HtmlTsCommunicationComponent } from './html-ts-communication/html-ts-communication.component';
import { DirectivesDemoComponent } from './directives-demo/directives-demo.component';
import { ParentComponentComponent } from './parent-component/parent-component.component';
import { ComponentsDeepDiveComponent } from './components-deep-dive/components-deep-dive.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { UserCardComponent } from './user-card/user-card.component';
import { EncapsulationDemoComponent } from './encapsulation-demo/encapsulation-demo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/html-ts-communication', pathMatch: 'full' },
  { path: 'html-ts-communication', component: HtmlTsCommunicationComponent },
  { path: 'directives-demo', component: DirectivesDemoComponent },
  { path: 'parent-child-communication', component: ParentComponentComponent },
  { path: 'components-deep-dive', component: ComponentsDeepDiveComponent },
  { path: 'header-component', component: HeaderComponentComponent },
  { path: 'user-card', component: UserCardComponent },
  { path: 'encapsulation-demo', component: EncapsulationDemoComponent }
];
