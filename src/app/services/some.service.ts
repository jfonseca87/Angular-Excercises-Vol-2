import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SomeService {
  streamObservable = interval(1000);
  streamObservableTwo = interval(750);
  streamObservableThree = interval(500);
  streamObservableFour = interval(250);

  constructor() { }
}
