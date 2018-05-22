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
import { DialogComponent } from './components/dialog/dialog.component';
import { HostDirective } from './components/dialog/host.directive';
import { TestComponent } from './components/test/test.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { TestService } from './services/test.service';
import { UserService } from './services/user.service';
import { SurveyContainerDirective } from './components/feedback/survey-container.directive';
import { GoodComponent } from './components/survey/good/good.component';
import { BadComponent } from './components/survey/bad/bad.component';




@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    StarComponent,
    DialogComponent,
    HostDirective,
    TestComponent,
    OverlayComponent,
    SurveyContainerDirective,
    GoodComponent,
    BadComponent
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
  entryComponents: [
  	TestComponent,
  	OverlayComponent,
    BadComponent,
    GoodComponent
  ],
  providers: [
  	ConstantsProvider,
  	UserService,
    TestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
