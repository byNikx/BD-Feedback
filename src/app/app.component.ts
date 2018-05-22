import { Component } from '@angular/core';
import { TestService } from './services/test.service';
import { GoodComponent } from './components/survey/good/good.component';
import { BadComponent } from './components/survey/bad/bad.component';
import { TestComponent } from './components/test/test.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  size: string;
  count: number = 5;
  ratingConfig: Object = {
  	poorRating: 3,
  	onSelect1(rating){
  		console.log('on select callback executed', rating);
  	},
    onPoorRating1(rating){
      console.log("poor rating callback", rating);
    },
    onGoodRating1(rating){
      console.log("good rating callback", rating);
    },
    survey:{
      onGood: GoodComponent,
      onBad: BadComponent
    }
  };

constructor(
    testService: TestService ) {
      // console.log("this.testService", this.testService.title);
    }

  saveRating(rating): void{
  	console.log("rating", rating);  	
  }

}
