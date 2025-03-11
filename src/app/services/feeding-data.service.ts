import { Injectable } from '@angular/core';
import { FeedingRecord } from '../types/feeding-record';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedingDataService {
  private _storage!: Storage;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async insertFeedingRecord(feedingRecord: FeedingRecord): Promise<void> {
    await this._storage?.set(feedingRecord.id, feedingRecord)
  }

  public getFeedingRecords(): Promise<FeedingRecord[]> {
    let feedingRecords: FeedingRecord[] = []

    return this._storage?.forEach((value, key, index) => {
      console.log("RECORD LOADED")
      feedingRecords.push(value)
    }).then(() => {
      feedingRecords.sort((a, b) => {
        return a.startTime > b.startTime ? 1 : -1
      }).reverse()
      return Promise.resolve(feedingRecords)
    })


    // return of([
    //   {
    //     id: "test",
    //     startTime: new Date(),
    //     endTime: new Date(),
    //     leftFeedingElapsedTime: 0,
    //     rightFeedingElapsedTime: 0
    //   },
    //   {
    //     id: "test",
    //     startTime: new Date(),
    //     endTime: new Date(),
    //     leftFeedingElapsedTime: 0,
    //     rightFeedingElapsedTime: 0
    //   }
    // ])
  }
}
