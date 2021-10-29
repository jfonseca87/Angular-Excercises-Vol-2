import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { EndPoint } from '../models/enums/enums';

@Injectable()
export abstract class GenericService {

  constructor(private client: HttpClient) { }

  getDataList<T>(complementUrl: EndPoint): Observable<T> {
    return this.client.get<any>(`${environment.baseUrl}${complementUrl}`)
                      .pipe(
                        map(response => response.results as T)
                      );
  }
}
