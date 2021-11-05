import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserFormTabComponent } from './components/user-form-tab/user-form-tab.component';
import { UserFormToolbarComponent } from './components/user-form-toolbar/user-form-toolbar.component';
import { UserStoreService } from './services/user-store.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserFormComponent,
    UserFormTabComponent,
    UserFormToolbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    UserStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
