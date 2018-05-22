import { 
  Component, 
  OnInit,
  ElementRef,
  Renderer2,
  HostListener,
  InjectionToken,
  Input,
  Inject,
  Injector } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from './overlay-container';



@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  
  constructor(
  	private _element: ElementRef,
  	private _renderer: Renderer2,
  	@Inject(DOCUMENT) private _document: Document,
    private _overlayContainer: OverlayContainer, 
    private _injector: Injector ) { }

  ngOnInit() {
  }

  visibility(visibility: string){
  	this._renderer.setStyle(this._element.nativeElement, 'display', visibility);
  }
  show(){
  	this.visibility('block');
  }

  hide(){
  	this.visibility('none');
  }

  create(){
    const host = this._createHostElement();
//  	this.renderer.createElement('section');
  }

//  @HostListener('click')

  /**
   *  Creates the DOM element for an overlay and appends it to the overlay container.
   * @param  {HTMLElement} host [description]
   * @return {HTMLElement}      [description]
   */
  private _createPaneElement(host: HTMLElement): HTMLElement {
    const pane = this._document.createElement('div');

//    pane.id = `cdk-overlay-${nextUniqueId++}`;
    pane.classList.add('app-overlay-pane');
    host.appendChild(pane);

    return pane;
  }

  /**
   * Creates the host element that wraps around an overlay.
   * @return {HTMLElement} host element
   */
  private _createHostElement(): HTMLElement{
  	const host = this._renderer.createElement('section');
    this._renderer.appendChild(
      this._overlayContainer.getContainerElement(), host
    );
    return host;
  }

}
