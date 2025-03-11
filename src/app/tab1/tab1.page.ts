import { Component } from '@angular/core';
import { IonButton } from '@ionic/angular';
import * as moment from 'moment';
import { interval, pipe, map, timer, timeInterval, Subscription } from 'rxjs';
import { FeedingDataService } from '../services/feeding-data.service';
import { v4 as uuidv4 } from 'uuid';
import { FeedingRecord } from '../types/feeding-record';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  protected leftBoobTimerOn = false;
  protected rightBoobTimerOn = false;

  protected initialStartTime?: Date;
  protected endTime?: Date;

  protected leftBoobElapsedSeconds: number = 0;
  protected rightBoobElapsedSeconds: number = 0;

  protected leftBoobSubscription?: Subscription;
  protected rightBoobSubscription?: Subscription;

  constructor(
    private feedingService: FeedingDataService
  ) {
  }

  startLeftBoobTimer(): void {
    if (!this.initialStartTime) {
      this.initialStartTime = new Date();
    }

    this.leftBoobSubscription =
      timer(0, 1000)
        .pipe(timeInterval())
        .subscribe(value => ++this.leftBoobElapsedSeconds)
    this.leftBoobTimerOn = true
    this.pauseRightBoobTimer()
  }

  pauseLeftBoobTimer(): void {
    this.leftBoobSubscription?.unsubscribe()
    this.leftBoobTimerOn = false

    if (!this.rightBoobTimerOn) {
      this.endTime = new Date();
    }
  }

  startRightBoobTimer(): void {
    if (!this.initialStartTime) {
      this.initialStartTime = new Date();
    }

    this.rightBoobSubscription =
      timer(0, 1000)
        .pipe(timeInterval())
        .subscribe(value => ++this.rightBoobElapsedSeconds)
    this.rightBoobTimerOn = true
    this.pauseLeftBoobTimer()
  }

  pauseRightBoobTimer(): void {
    this.rightBoobSubscription?.unsubscribe()
    this.rightBoobTimerOn = false

    if (!this.leftBoobTimerOn) {
      this.endTime = new Date();
    }
  }

  completeFeeding(): void {
    const newFeedingRecord: FeedingRecord = {
      id: uuidv4(),
      startTime: this.initialStartTime ? this.initialStartTime : new Date(),
      endTime: this.endTime ? this.endTime : new Date(),
      leftFeedingElapsedTime: this.leftBoobElapsedSeconds,
      rightFeedingElapsedTime: this.rightBoobElapsedSeconds
    }

    this.feedingService.insertFeedingRecord(newFeedingRecord)
      .then(() => console.log(`Inserted new record`, newFeedingRecord))
      .catch(err => console.error(`Failed to insert record`, err))
  }
}
