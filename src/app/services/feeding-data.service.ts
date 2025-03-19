import { Injectable } from '@angular/core';
import { FeedingRecord } from '../types/feeding-record';
import { Storage } from '@ionic/storage-angular';

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

  public insertFeedingRecord(feedingRecord: FeedingRecord): Promise<void> {
    return this._storage?.set(feedingRecord.id, feedingRecord)
  }

  public deleteFeedingRecord(id: string): Promise<void> {
    return this._storage?.remove(id)
  }

  public getFeedingRecord(id: string): Promise<FeedingRecord> {
    console.log(`Loading record by id: ${id}`)
    return this._storage?.get(id)
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
  }
}
