import { Routes } from '@angular/router';
import { HtmlTsCommunicationComponent } from './html-ts-communication/html-ts-communication.component';
import { DirectivesDemoComponent } from './directives-demo/directives-demo.component';
import { ParentComponentComponent } from './parent-component/parent-component.component';
import { ComponentsDeepDiveComponent } from './components-deep-dive/components-deep-dive.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { UserCardComponent } from './user-card/user-card.component';
import { EncapsulationDemoComponent } from './encapsulation-demo/encapsulation-demo.component';
import { LifecycleDemoComponent } from './lifecycle-demo/lifecycle-demo.component';
import { ContentChildDemoComponent } from './content-child-demo/content-child-demo.component';
import { TemplateDemoComponent } from './template-demo/template-demo.component';
import { ParentChildCommunicationDemoComponent } from './parent-child-communication-demo/parent-child-communication-demo.component';
import { ObservablesSignalsDemoComponent } from './observables-signals-demo/observables-signals-demo.component';
import { ServicesDependencyInjectionDemoComponent } from './services-dependency-injection-demo/services-dependency-injection-demo.component';
import { RoutingDemoComponent } from './routing-demo/routing-demo.component';
import { WhyRouterComponent } from './routing-demo/why-router/why-router.component';
import { SetupRoutesComponent } from './routing-demo/setup-routes/setup-routes.component';
import { RouterLinksComponent } from './routing-demo/router-links/router-links.component';
import { NavigationPathsComponent } from './routing-demo/navigation-paths/navigation-paths.component';
import { StylingLinksComponent } from './routing-demo/styling-links/styling-links.component';
import { ProgrammaticNavigationComponent } from './routing-demo/programmatic-navigation/programmatic-navigation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/html-ts-communication', pathMatch: 'full' },
  { path: 'html-ts-communication', component: HtmlTsCommunicationComponent },
  { path: 'directives-demo', component: DirectivesDemoComponent },
  { path: 'parent-child-communication', component: ParentComponentComponent },
  { path: 'components-deep-dive', component: ComponentsDeepDiveComponent },
  { path: 'header-component', component: HeaderComponentComponent },
  { path: 'user-card', component: UserCardComponent },
  { path: 'encapsulation-demo', component: EncapsulationDemoComponent },
  { path: 'lifecycle-demo', component: LifecycleDemoComponent },
  { path: 'content-child-demo', component: ContentChildDemoComponent },
  { path: 'template-demo', component: TemplateDemoComponent },
  { path: 'parent-child-communication-demo', component: ParentChildCommunicationDemoComponent },
  { path: 'observables-signals-demo', component: ObservablesSignalsDemoComponent },
  { path: 'services-dependency-injection-demo', component: ServicesDependencyInjectionDemoComponent },
  {
    path: 'routing-demo',
    component: RoutingDemoComponent,
    children: [
      { path: '', redirectTo: 'why-router', pathMatch: 'full' },
      { path: 'why-router', component: WhyRouterComponent },
      { path: 'setup-routes', component: SetupRoutesComponent },
      { path: 'router-links', component: RouterLinksComponent },
      { path: 'navigation-paths', component: NavigationPathsComponent },
      { path: 'styling-links', component: StylingLinksComponent },
      { path: 'programmatic-navigation', component: ProgrammaticNavigationComponent }
    ]
  }
];
