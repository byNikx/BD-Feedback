import { 
  Component, 
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef,
  Inject } from '@angular/core';
import { SurveyContainerDirective } from './survey-container.directive';
import { TestComponent } from '../test/test.component';
import { APP_CONSTANT } from '../../app.constants';

/**
 * This interface is defined just to keep 
 * typescript happy while type checking :))
 */
interface LoadedComponent<T>{
  componentRef:ComponentRef<T>;
  component: any;
}

@Component({
  selector: 'bd-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  private _selectedRating: number;
  private _tempRating: number;
  private _max: number;
  public stars: any[];
  private _size: string;
  private _poorRating: number;
  private _config: any;
  private _onSelectCallback: any = null;
  private _surveyComponent: LoadedComponent<any>;
  private survey: any;
  private _alignment: any = {};

  /**
   * Getter for variable _alignment
   * @return {any} alignments
   */
  get alignment(): any{
    return this._alignment;
  }

  /**
   * Setter for variable _alignment
   * @param {any} aligment [description]
   */
  set alignment(aligment: any){
    this._alignment = aligment;
  }

  /**
   * Placeholder for dynamically loaded component 
   * @param {SurveyContainerDirective} surveyContainer
   */
  @ViewChild(SurveyContainerDirective) surveyContainer: SurveyContainerDirective;
  
  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    @Inject( APP_CONSTANT ) public APP_CONSTANT: any) { }
    

  ngOnInit() {
  	this.stars = new Array(this.max);
    this.alignment.rating = `${this.APP_CONSTANT.FLEX_LAYOUT_ALIGN.CENTER} ${this.APP_CONSTANT.FLEX_LAYOUT_ALIGN.CENTER}`
  }

  /**
   * Getter for variable _surveyComponent
   * @return {ComponentRef<any>} survey component reference.
   */
  get surveyComponent(): LoadedComponent<any>{
    return this._surveyComponent;
  }

  /**
   * Setter for variable _surveyComponent
   * @param {ComponentRef<any>} component reference of type <T>
   */
  set surveyComponent(component: LoadedComponent<any>){
    if(this.surveyComponent)
      this.surveyComponent.componentRef.destroy();

    this._surveyComponent = component;
  }


  /** 
   * Getter for variable _poorRating
   * @returns {number} return poor rating
   */
  get poorRating(): number{
    return this._poorRating;
  }

  /**
   * Setter for variable _poorRating
   * @param {number} rating
   */
  set poorRating(rating: number){
    this._poorRating = rating || Math.floor(this.max/2);
  }

  /**
   * Attribute to assign rating size
   * @param {string} size - size of the rating icons ['small', 'medium', 'large', 'xl'], default: 'medium'
   */
  @Input() set size(size: string){
    this._size = size;
  }

  /**
   * Getter for variable _size
   * @return {string} size of the rating icons
   */
  get size(): string{
    return this._size;
  }

  /**
   * Attribute to assign maximum rating
   * @param {number} ) set max(count [description]
   */
  @Input() set max(count: number){
    this._max = count || 5;
  };

  get max(): number{
    return this._max;
  }
 
  /**
   * Getter for variable _config
   * @return {Object} returns config object
   */
  get config(): any{
    return this._config;
  }

  /**
   * Setter for variable _config
   * @param {Object} ) set config(config [description]
   */
  @Input() set config(config: any){
    this._config = config;
    if(this.config.onSelect){
      this._onSelectCallback = this.config.onSelect;
      delete this.config.onSelect;      
    }

    if(this.config.onPoorRating){
      this._onPoorRatingCallback = this.config.onPoorRating;
      delete this.config.onPoorRating;
    }

    if(this.config.onGoodRating){
      this._onGoodRatingCallback = this.config.onGoodRating;
      delete this.config.onGoodRating;
    }
    Object.assign(this, this.config);
  }

  /**
   * Event triggers when user selects a rating
   * @param {[type]} ) onSelect = new EventEmitter( [description]
   */
  @Output() onSelect = new EventEmitter();

  /**
   * Getter for variable _selectedRating
   */
  get selectedRating(): number{
    return this._selectedRating;
  }

  /**
   * Setter for variable _selectedRating
   * @param {number} rating - value of selected rating
   */
  set selectedRating(rating: number){
    this._selectedRating = rating;

    if(typeof this._onSelectCallback === 'function'){
      this._onSelectCallback(rating);
    }else{      
      this.onSelect.emit(rating);          
    }
    this._handleSurvey(rating);
  }

  /**
   * Getter for variable _tempRating
   */
  get tempRating(): number{
    return this._tempRating;
  }

  /**
   * Setter for variable _tempRating
   * @param {number} rating - value of rating on which mouse pointer is currently on
   */
  set tempRating(rating: number){
    this._tempRating = rating;
  }


  /**
   * Checks if the rating is selected or not 
   * @param  {number}  rating [description]
   * @return {boolean} status of the rating
   */
  public isRatingSelected(rating: number): boolean{
  	return rating <= ( this.tempRating || this.selectedRating );
  }

  /**
   * Assigns the temporary rating
   * @param {number} rating - value of rating on which mouse pointer is currently on
   */
  public highlightRating(rating: number): void{
  	this.tempRating = rating;
  }

  /**
   * Registers the final rating
   * @param {number} rating - value of rating selected by the user
   */
  public registerRating(rating: number): void{
    if(rating!=this.selectedRating)
      this.selectedRating = rating;
  }

  /**
   * Handles the survey if there are any
   * @param {number} rating [description]
   */
  private _handleSurvey(rating: number): void{
    const isBadSurveyAvailable = !!this.survey.onBad;
    const isGoodSurveyAvailable = !!this.survey.onGood;
    const isPoorRating = rating <= this.poorRating;
    const isGoodRating = rating === this.max;
    const loadedSurvey = this.surveyComponent;

    if(isPoorRating){       
      if(this.survey.onBad){
        if(this.surveyComponent){
          if(!(this.surveyComponent.component === this.survey.onBad)){
            this._loadSurveyComponent(this.survey.onBad);
          }
        }else{
          this._loadSurveyComponent(this.survey.onBad);
        }
      }
      this._onPoorRatingCallback(rating);
    }else if(isGoodRating){
      if(this.survey.onGood){
        if(this.surveyComponent){
          if(!(this.surveyComponent.component === this.survey.onGood)){
            this._loadSurveyComponent(this.survey.onGood);
          }
        }else{
          this._loadSurveyComponent(this.survey.onGood);
        }
      }

      this._onGoodRatingCallback(rating);
    }else{
      this._loadSurveyComponent(null);
    }
  }

  /**
   * Loads the survey component
   * @param {any} component [description]
   */
  private _loadSurveyComponent(component: any){
    if(component)
      this.surveyComponent = this._loadComponent(component);
    else
      this.surveyComponent = component;
  }

  /**
   * Creates a dynamic component and attach its reference to HostDirective
   * @param {any} component - Component required to show inside the dialog
   * @return {ComponentRef<T>}
   */
  private _loadComponent<T>(component: any, data = {}):LoadedComponent<T>{
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory<T>(component);
    let viewContainerRef = this.surveyContainer.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent<T>(componentFactory);
    (componentRef.instance)['data'] = data;
    componentRef.onDestroy(() => {
      console.log('Survey component destroyed!',componentRef.instance.constructor.name);
    });
    return {componentRef, component};
  }

  /**
   * Default poor rating callback 
   * @param {number} rating [description]
   */
  private _onPoorRatingCallback(rating: number){
//    console.log("on poor rating callback local", rating);
  }

  /**
   * Default good rating callback
   * @param {number} rating [description]
   */
  private _onGoodRatingCallback(rating: number){
//  console.log("on good rating callback local", rating);
  }

}
