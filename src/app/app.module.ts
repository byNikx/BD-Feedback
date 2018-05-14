import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { 
  NgModule, 
  forwardRef,
  InjectionToken, 
  APP_INITIALIZER, 
  LOCALE_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { 
  FormsModule, 
  ReactiveFormsModule } from '@angular/forms';
import { ConstantsProvider } from './app.constants';

/****Custom Modules****/
import {MAT_MODULES} from './material/material.module'; 
//import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { StarComponent } from './components/feedback/star/star.component';



@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    StarComponent
  ],
  imports: [
    ...MAT_MODULES,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
  	ConstantsProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
