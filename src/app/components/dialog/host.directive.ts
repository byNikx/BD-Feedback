import { 
  Directive,
  ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHost], [app-host]'
})
export class HostDirective {

  constructor(
  	public viewContainerRef: ViewContainerRef ) {
  }

}
