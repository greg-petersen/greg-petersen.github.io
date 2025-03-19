import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatISO } from "date-fns";
import { FeedingDataService } from '../services/feeding-data.service';
import { FeedingRecord } from '../types/feeding-record';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.scss'],
  standalone: false
})
export class EditRecordComponent {
  record?: FeedingRecord
  hasChanges: boolean = false
  editingLeft: boolean = false
  editingRight: boolean = false
  minutes: number = 0
  seconds: number = 0

  constructor(
    private feedingService: FeedingDataService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      const recordId = params['record-id']
      console.log({ recordId })

      this.feedingService.getFeedingRecord(recordId)
        .then(record => {
          console.log("Loaded ", record)
          console.log(formatISO(record.startTime))
          this.record = record
        })
    })
  }

  onMinuteChange(event: CustomEvent) {
    this.minutes = event.detail.value;
  }

  onSecondChange(event: CustomEvent) {
    this.seconds = event.detail.value
  }

  onDidDismiss(event: CustomEvent) {
    console.log('didDismiss', JSON.stringify(event.detail));
    this.editingLeft = false
    this.editingRight = false



    const { seconds, minutes, left } = event.detail.data

    if (!this.record)
      return

    if (left) {
      this.record.leftFeedingElapsedTime = (+minutes * 60) + +seconds
      console.log("calculated new elapsed feeding time", this.record.leftFeedingElapsedTime)
    } else {
      this.record.rightFeedingElapsedTime = (+minutes * 60) + +seconds
    }
  }

  editLeft() {
    this.editingLeft = true
  }

  editRight() {
    this.editingRight = true
  }

  formatDate(date: Date): string {
    return formatISO(date)
  }

  save() {

  }
}
