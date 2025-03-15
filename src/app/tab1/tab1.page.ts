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
  leftBoobStartTime?: Date;
  rightBoobStartTime?: Date;
  protected endTime?: Date;

  protected leftBoobAccumulatedSeconds: number = 0;
  protected leftBoobTotalSeconds: number = 0;

  protected rightBoobAccumulatedSeconds: number = 0;
  protected rightBoobTotalSeconds: number = 0;

  uiUpdateSub?: Subscription;

  constructor(
    private feedingService: FeedingDataService
  ) {
  }

  startLeftBoobTimer(): void {
    if (!this.initialStartTime) {
      this.initialStartTime = new Date()
    }

    this.leftBoobStartTime = new Date();
    this.leftBoobTimerOn = true

    if (this.rightBoobTimerOn) {
      this.pauseRightBoobTimer()
    }

    this.startUISubscription()
  }


  pauseLeftBoobTimer(): void {
    this.leftBoobTimerOn = false
    // We need to calculate accumulated seconds and add it to existing sum
    const startTime = this.leftBoobStartTime ? this.leftBoobStartTime : new Date()
    this.leftBoobAccumulatedSeconds += this.getSecondsBetween(startTime, new Date())
    this.leftBoobStartTime = undefined
    this.uiUpdateSub?.unsubscribe()
    this.uiUpdateSub = undefined

    if (!this.rightBoobTimerOn) {
      this.endTime = new Date();
    }
  }

  startRightBoobTimer(): void {
    if (!this.initialStartTime) {
      this.initialStartTime = new Date()
    }

    this.rightBoobStartTime = new Date();
    this.rightBoobTimerOn = true

    if (this.leftBoobTimerOn) {
      this.pauseLeftBoobTimer()
    }

    this.startUISubscription()
  }

  pauseRightBoobTimer(): void {
    this.rightBoobTimerOn = false
    // We need to calculate accumulated seconds and add it to existing sum
    const startTime = this.rightBoobStartTime ? this.rightBoobStartTime : new Date()
    this.rightBoobAccumulatedSeconds += this.getSecondsBetween(startTime, new Date())
    this.rightBoobStartTime = undefined
    this.uiUpdateSub?.unsubscribe()
    this.uiUpdateSub = undefined

    if (!this.leftBoobTimerOn) {
      this.endTime = new Date();
    }
  }

  startUISubscription() {
    if (!this.uiUpdateSub) {
      this.uiUpdateSub =
        timer(0, 1000)
          .subscribe(() => this.performUIUpdate())

    }
  }

  performUIUpdate() {
    if (this.leftBoobStartTime) {
      this.leftBoobTotalSeconds = this.getSecondsBetween(this.leftBoobStartTime, new Date()) + this.leftBoobAccumulatedSeconds
    }

    if (this.rightBoobStartTime) {
      this.rightBoobTotalSeconds = this.getSecondsBetween(this.rightBoobStartTime, new Date()) + this.rightBoobAccumulatedSeconds
    }
  }

  reset(): void {
    this.initialStartTime = undefined
    this.leftBoobStartTime = undefined
    this.rightBoobStartTime = undefined
    this.endTime = undefined
    this.uiUpdateSub = undefined
    this.leftBoobTotalSeconds = 0
    this.rightBoobTotalSeconds = 0
    this.leftBoobAccumulatedSeconds = 0
    this.rightBoobAccumulatedSeconds = 0
  }

  getSecondsBetween(startTime: Date, endTime: Date): number {
    return (+endTime - +startTime) / 1000
  }


  calculateElapsedTime(accumulatedSeconds: number, startTime: Date | undefined, endTime: Date): number {
    const sTime = startTime ? startTime : new Date()

    const elapsedSeconds = this.getSecondsBetween(sTime, endTime)

    return elapsedSeconds + accumulatedSeconds
  }

  completeFeeding(): void {
    const newFeedingRecord: FeedingRecord = {
      id: uuidv4(),
      startTime: this.initialStartTime ? this.initialStartTime : new Date(),
      endTime: this.endTime ? this.endTime : new Date(),
      leftFeedingElapsedTime: this.leftBoobTotalSeconds,
      rightFeedingElapsedTime: this.rightBoobTotalSeconds
    }

    this.feedingService.insertFeedingRecord(newFeedingRecord)
      .then(() => console.log(`Inserted new record`, newFeedingRecord))
      .catch(err => console.error(`Failed to insert record`, err))

    this.initialStartTime = undefined
    this.leftBoobStartTime = undefined
    this.rightBoobStartTime = undefined
    this.endTime = undefined
    this.leftBoobAccumulatedSeconds = 0
    this.leftBoobTotalSeconds = 0
    this.rightBoobAccumulatedSeconds = 0
    this.rightBoobTotalSeconds = 0
  }
}

