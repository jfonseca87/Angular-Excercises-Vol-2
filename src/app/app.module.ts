import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CharactersComponent } from './components/characters/characters.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterService } from './services/character.service';
import { EpisodeService } from './services/episode.service';
import { LocationService } from './services/location.service';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterCardComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CharacterService,
    EpisodeService,
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
