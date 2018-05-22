import { 
  Component, 
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef } from '@angular/core';

import { HostDirective } from './host.directive';
import { OverlayComponent } from '../overlay/overlay.component';

import { TestComponent } from '../test/test.component';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  /**
   * Placeholder for dynamically loaded component 
   * @param {HostDirective} host
   */
  @ViewChild(HostDirective) host: HostDirective;

  constructor(
  	private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  	this.loadComponent(TestComponent);
  }

  /**
   * Creates a dynamic component and attach its reference to HostDirective
   * @param {any} component - Component required to show inside the dialog 
   * @return {ComponentRef<T>}
   */
  loadComponent<T>(component: any): ComponentRef<T>{
  	let componentFactory = this.componentFactoryResolver.resolveComponentFactory<T>(component);
  	let viewContainerRef = this.host.viewContainerRef;
  	viewContainerRef.clear();

  	let componentRef = viewContainerRef.createComponent<T>(componentFactory);
  	(componentRef.instance)['data'] = 'Hello World';
  	return componentRef;
  }

}
