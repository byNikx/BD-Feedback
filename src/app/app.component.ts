import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  size: string;
  count: number = 5;

  saveRating(rating): void{
  	console.log("rating", rating);  	
  }
}
