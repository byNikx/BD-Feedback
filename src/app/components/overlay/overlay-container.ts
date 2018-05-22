import {
  Injectable,
  Inject,
  OnDestroy,
  Renderer2,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

@Injectable()
export class OverlayContainer implements OnDestroy{
	
  protected _containerElement: HTMLElement;

  constructor(
  	protected renderer: Renderer2, 
  	@Inject(DOCUMENT) protected document: Document ) {}

  ngOnDestroy(){
  	if(this._containerElement && this.renderer.parentNode(this._containerElement)){
  	  this.renderer.parentNode(this._containerElement).removeChild(this._containerElement);
  	}
  }

  /**
   * Create the overlay container element on the document body
   */
  protected _createContainer(): void{
  	const container = this.renderer.createElement('section');
  	this.renderer.addClass(container, 'overlay-container');
  	this.renderer.appendChild(this.document.body, container);
  	this._containerElement = container;
  }

  /**
   * This method returns the overlay container element
   * @return {HTMLElement} the container element
   */
  public getContainerElement(): HTMLElement{
  	if(!this._containerElement)
  	  this._createContainer();

  	return this._containerElement;
  }
}