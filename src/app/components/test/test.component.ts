import { 
  Component, 
  OnInit 
} from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


const STATE = {
  enter: state('enter', style({
	transform: 'translateX(0)'
  })),
  leave: state('leave', style({
  })) 
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  animations: [
  	trigger('onLoad', [
  	  STATE.enter,
  	  STATE.leave,
  	    transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition(':leave', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
  	])
  ]
})
export class TestComponent implements OnInit {
  
  data: any;
  constructor() { }

  ngOnInit() {
  }

  test(){
  	alert(this.data.rating);
  }


}
