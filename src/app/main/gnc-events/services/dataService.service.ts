import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "environments/environment";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  category: any;
  event: any;
  eventGroup: any;
  registeredUserInfo: any;

  allCenters;
  activeCenters;


  async fetchMasterData() {
    this.fetchAllCenters();
  }



  getActiveCenters() {
    return this.activeCenters;
  }

  getAllCenters() {
    return this.allCenters;
  }

  async fetchAllCenters() {
    await this.http.get(environment.apiUrl + '/base/centers/').toPromise().then(centers => {
      this.allCenters = centers;
      this.activeCenters = this.allCenters.filter(center => center.is_displayed);
    });

  }

}