import { Input, Component } from '@angular/core';

import { FeedingDataService } from '../services/feeding-data.service';
import { v4 as uuidv4 } from 'uuid';
import { FeedingRecord } from '../types/feeding-record';
import { Observable, of, from } from 'rxjs';

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
}
