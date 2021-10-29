import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Character } from 'src/app/models/character';
import { EndPoint } from 'src/app/models/enums/enums';
import { Episode } from 'src/app/models/episode';
import { Location } from 'src/app/models/location';
import { CharacterService } from 'src/app/services/character.service';
import { EpisodeService } from 'src/app/services/episode.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  characters!: Character[];
  episodes!: Episode[];
  locations!: Location[];
  characters$!: Observable<Character[]>;
  episode$!: Observable<Episode[]>;
  location$!: Observable<Location[]>;

  constructor(private characterService: CharacterService,
    private episodeService: EpisodeService,
    private locationService: LocationService) { }

  ngOnInit() {
    this.setSubjects();
    this.getInitialData();
  }

  setSubjects() {
    this.characters$ = this.characterService.getAllCharacters();
    this.episode$ = this.episodeService.getDataList<Episode[]>(EndPoint.Episode);
    this.location$ = this.locationService.getDataList<Location[]>(EndPoint.Location);
  }

  getInitialData() {
    forkJoin([this.characters$, this.episode$, this.location$]).subscribe(
      response => {
        const [characters, episodes, locations] = response;
        this.characters = characters;
        this.episodes = episodes;
        this.locations = locations;
        console.log(this.characters);
        console.log(this.episodes);
        console.log(this.locations);
      }
    )
  }
}
