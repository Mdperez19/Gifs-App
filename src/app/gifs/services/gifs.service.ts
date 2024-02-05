import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private  APIKEY: string = 'LMzumwFCNmM3DdT52MauGv7l8VcDI0ZG';

  constructor() { }

  get tagsHistory() {
    return [...this._tagsHistory]; // return a copy of the array
  }

  async searchTag(tag: string): Promise<void> {
    if (tag.trim().length === 0)
      return;

    this.organizeTagsHistory(tag);

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.APIKEY}&q=${tag}&limit=10`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
    console.log(this._tagsHistory);
  }

  organizeTagsHistory(tag: string) {
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag); // add the tag to the beginning of the array
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }
}
