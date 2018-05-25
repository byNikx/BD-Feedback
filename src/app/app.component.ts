import { 
  Component,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { TestService } from './services/test.service';
import { GoodComponent } from './components/survey/good/good.component';
import { BadComponent } from './components/survey/bad/bad.component';
import { TestComponent } from './components/test/test.component';
import { FeedbackComponent } from './components/feedback/feedback.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild( FeedbackComponent ) feedback: FeedbackComponent;
  title = 'app';
  size: string;
  count: number = 5;
  ratingConfig: Object = {
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
  testService: TestService ) 
{
  // console.log("this.testService", this.testService.title);
}

ngAfterViewInit(){
  this.feedback.onPoor.subscribe(rating => console.log('app component onPoor rating', rating));
  this.feedback.onGood.subscribe(rating => console.log('app component onGood rating', rating));
  this.feedback.onSelect.subscribe(rating => console.log('app component onSelect rating', rating));
  console.log("feedback", this.feedback);   
}
saveRating(rating): void{
	console.log("rating1", rating);  	
}

}
