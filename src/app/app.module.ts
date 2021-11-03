import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SomeService } from './services/some.service';
import { UnsuscribeComponent } from './components/unsuscribe/unsuscribe.component';

@NgModule({
  declarations: [
    AppComponent,
    UnsuscribeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    SomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
