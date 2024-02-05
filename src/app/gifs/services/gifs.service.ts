import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private  APIKEY: string = 'LMzumwFCNmM3DdT52MauGv7l8VcDI0ZG';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { }

  get tagsHistory() {
    return [...this._tagsHistory]; // return a copy of the array
  }

  searchTag(tag: string): void {
    if (tag.trim().length === 0)
      return;

    this.organizeTagsHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.APIKEY)
      .set('limit', '10')
      .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceURL}/search`, {params: params })
      .subscribe(response => {
        this.gifList = response.data;
      });
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
