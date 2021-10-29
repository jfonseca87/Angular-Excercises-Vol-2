import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  searchControl: FormControl = new FormControl();

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.getAllCharacters();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) => {
          if (value === '') {
            return this.characterService
              .getAllCharacters()
              .pipe(catchError((error) => of()));
          }
          return this.characterService
            .getCharactersByName(value)
            .pipe(catchError((error) => of()));
        })
      )
      .subscribe(
        (response) => {
          this.characters = response
        },
        (error) => {
          this.characters = [];
        }
      );
  }

  getAllCharacters(): void {
    this.characterService.getAllCharacters().subscribe(
      (response) => {
        this.characters = response;
        console.log(this.characters);
      },
      (error) => console.log(error)
    );
  }
}
