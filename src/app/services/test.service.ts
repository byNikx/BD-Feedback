import { HttpClient } from '@angular/common/http';

export class TestService {
  
  constructor(http: HttpClient) { 
  	console.log("http", http);
  }

  title = "test service";

}
