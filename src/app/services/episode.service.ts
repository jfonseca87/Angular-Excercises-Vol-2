import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

@Injectable()
export class EpisodeService extends GenericService {

  constructor(client: HttpClient) {
    super(client);
  }
}
