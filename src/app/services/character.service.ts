import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private client: HttpClient) {}

  getAllCharacters(): Observable<Character[]> {
    return this.client
      .get<Character[]>(`${environment.baseUrl}/character`)
      .pipe(
        map((response: any) => response.results as Character[])
      );
  }

  getCharactersByName(search: string): Observable<any> {
    return this.client.get<any>(
      `${environment.baseUrl}/character/?name=${search}`
    )
    .pipe(
      map((response: any) => response.results as Character[])
    );
  }
}
