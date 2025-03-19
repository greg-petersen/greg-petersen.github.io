import { Component } from '@angular/core';

import { from, Observable } from 'rxjs';
import { FeedingDataService } from '../services/feeding-data.service';
import { FeedingRecord } from '../types/feeding-record';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  records!: Observable<FeedingRecord[]>;
  latestRecord!: Observable<FeedingRecord>

  constructor(
    private feedingService: FeedingDataService
  ) {
  }

  ionViewWillEnter() {
    console.log("Ion will enter")
    this.records = this.getRecords()
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }

  getRecords(): Observable<FeedingRecord[]> {
    return from(this.feedingService.getFeedingRecords())
  }

  deleteItem(feedingRecord: FeedingRecord): void {
    console.log("delete item", feedingRecord)
    this.feedingService.deleteFeedingRecord(feedingRecord.id)
      .finally(() => {
        this.records = this.getRecords()
      })
  }
}
