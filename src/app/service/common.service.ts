import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = 'https://api.tvmaze.com/';
  constructor(private https: HttpClient) { }

  getallShowsList(): Promise<any> {
    return this.https.get(this.baseUrl + `shows`).toPromise();
  }
  getShowDetails(id): Promise<any> {
    return this.https.get(this.baseUrl + `shows/`+ id).toPromise();
  }
  showSearch(searchname): Promise<any> {
    return this.https.get(this.baseUrl + `search/shows?q=`+ searchname).toPromise();
  }
}
