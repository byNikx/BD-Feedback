import { 
  Directive,
  ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[surveyContainer]'
})
export class SurveyContainerDirective {

  constructor(
  	public viewContainerRef: ViewContainerRef) { }

}
