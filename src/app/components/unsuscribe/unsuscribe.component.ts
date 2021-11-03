import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { SomeService } from 'src/app/services/some.service';
import { first, take, takeUntil } from 'rxjs/operators';
import { Unsubscriber } from '../../custom-decorators/unsubscriber.decorator';

@Unsubscriber()
@Component({
  selector: 'app-unsuscribe',
  templateUrl: './unsuscribe.component.html',
  styleUrls: ['./unsuscribe.component.css'],
})
// export class UnsuscribeComponent implements OnInit, OnDestroy {
export class UnsuscribeComponent implements OnInit {
  // Used in wayToUnsubscribeOne function
  // subscription!: Subscription;
  // subscription2!: Subscription;

  // Used in wayToUnsubscribeFour function
  unSubscription$ = new Subject();

  constructor(private someService: SomeService) {}

  ngOnInit(): void {
    // this.wayToUnsubscribeOne();
    // this.wayToUnsubscribeTwo();
    // this.wayToUnsubscribeThree();
    // this.wayToUnsubscribeFour();
    this.wayToUnsubscribeFive();
    // this.wayToUnsubscribeFive();
  }

  /**
   * This method set in a subcrition object the observable
   */
  // wayToUnsubscribeOne() {
  //   this.subscription = this.someService.streamObservable.subscribe(
  //     response => console.log(response)
  //   );
  // }

  /**
   * In this method we use rxjs first operator
   */
  wayToUnsubscribeTwo() {
    this.someService.streamObservable
      .pipe(first())
      .subscribe((response) => console.log(response));
  }

  /**
   * In this method we use rxjs take(n) operator
   */
  wayToUnsubscribeThree() {
    this.someService.streamObservable
      .pipe(take(1))
      .subscribe((response) => console.log(response));
  }

  /**
   * In this method we use rxjs takeUntil(subject) operator
   */
  //  wayToUnsubscribeFour() {
  //   this.someService.streamObservable
  //   .pipe(takeUntil(this.unSubscription$))
  //   .subscribe(
  //     response => console.log(response)
  //   );
  // }

  /**
   * In this method we use a custom decorator to unsusbcribe using subcription object
   */
  wayToUnsubscribeFive() {
    this.someService.streamObservable
      .pipe(takeUntil(this.unSubscription$))
      .subscribe((response) => console.log(response));

    this.someService.streamObservableTwo
      .pipe(takeUntil(this.unSubscription$))
      .subscribe((response) => console.log(response));

    this.someService.streamObservableThree
      .pipe(takeUntil(this.unSubscription$))
      .subscribe((response) => console.log(response));

    this.someService.streamObservableFour
      .pipe(takeUntil(this.unSubscription$))
      .subscribe((response) => console.log(response));
  }

  // ngOnDestroy(): void {}
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  //   this.unSubscription$.next();
  //   this.unSubscription$.complete();
  // }
}
