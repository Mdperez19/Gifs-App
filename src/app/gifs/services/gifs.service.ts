import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory() {
    return [...this._tagsHistory]; // return a copy of the array
  }

  searchTag(tag: string): void {
    this._tagsHistory.unshift(tag); // add the tag to the beginning of the array
    console.log(this._tagsHistory);
  }
}
