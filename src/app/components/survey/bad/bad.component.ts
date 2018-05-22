import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bad',
  templateUrl: './bad.component.html',
  styleUrls: ['./bad.component.scss']
})
export class BadComponent implements OnInit {

  constructor() { }
  reason;
  ngOnInit() {
  }
  submit(reason){
  	this.reason = `Reason ${reason} selected`;
  }

}
