import { 
  Component, 
  OnInit,
  Input,
  Output,
  EventEmitter } from '@angular/core';

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
  
  /** 
   * Getter for variable _poorRating
   */
  get poorRating(): number{
  	return this._poorRating;
  }

  /**
   * Setter for variable _poorRating
   * @param {number} rating
   */
  set poorRating(rating: number){
  	this._poorRating = rating;
  }

  /**
   * Attribute to assign rating size
   * @param {string} size - size of the rating icons ['small', 'medium', 'large', 'xl'], default: 'medium'
   */
  @Input() set size(size: string){
  	this._size = size;
  }

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

  constructor() { }

  ngOnInit() {
  	this.stars = new Array(this.max);
  	this.poorRating = Math.floor(this.max/2);
  	console.log("this.poorRating", this.poorRating);
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
  	this.selectedRating = rating;
  	this.onSelect.emit(rating);
  }

}
