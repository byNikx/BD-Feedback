import { 
  Component, 
  OnInit,
  HostListener,
  Output,
  EventEmitter,
  Input, 
  Renderer2, 
  ElementRef,
  Inject } from '@angular/core';

import { APP_CONSTANT } from '../../../app.constants';

@Component({
  selector: 'bd-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
  host: {
  	'[class.highlight]': 'selected'
  }
})

export class StarComponent implements OnInit {
  
  /**
   * @param {Renderer2}  renderer - Renderer2 instance
   * @param {ElementRef} element - ElementRef instance
   */
  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    @Inject( APP_CONSTANT ) public APP_CONSTANT: any) { }

  ngOnInit() {
  }

  /**
   * [Manages state of the rating (true | false)]
   * @type {boolean}
   */
  private _selected: boolean;
  @Input() set selected(selected: boolean){
    this._selected = selected;
  };

  get selected(): boolean{
    return this._selected;
  }

  /**
   * Attribute to assign rating to the star
   */
  @Input() rating: number;
  
  /**
   * Attribute to assign size to the star. default: RATING_SIZE.MEDIUM
   * @param {RATING_SIZE} ) set size(size [description]
   */
  @Input() set size(size){
    this.renderer.setAttribute(
      this.element.nativeElement, 
      'class', ( size || this.APP_CONSTANT.RATING_SIZE.MEDIUM )
    );
  }

  /**
   * Event triggers on hover state of the star
   * @param {[type]} ) onHighlight = new EventEmitter( [description]
   */
  @Output() onHighlight = new EventEmitter();

  /**
   * Listener on the star for 'mouseenter event'
   * @param {[type]} 'mouseenter') highlight( [description]
   */
  @HostListener('mouseenter') highlight(){
    this.onHighlight.emit(this.rating);
  }

  /**
   * Listener on the star for 'mouseleave event'
   * @param {[type]} 'mouseleave') resetHighlight( [description]
   */
  @HostListener('mouseleave') resetHighlight(){
    this.onHighlight.emit(0);
  }

  /**
   * Event triggers when user selects a rating
   * @param {[type]} ) onSelect = new EventEmitter( [description]
   */
  @Output() onSelect = new EventEmitter();

  /**
   * Listener on the star for 'click event'
   * @param {[type]} 'click') select( [description]
   */
  @HostListener('click') select(){
    this.onSelect.emit(this.rating);
  }

}
