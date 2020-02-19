import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "environments/environment";
import { NgxSpinnerService } from "ngx-spinner";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient, private _spinner: NgxSpinnerService) { }
  category: any;
  event: any;
  eventGroup: any;
  registeredUserInfo: any;

  allCenters;
  activeCenters;


  async fetchMasterData() {
   await this.fetchAllCenters();
  }



  getActiveCenters() {
    return this.activeCenters;
  }

  getAllCenters() {
    return this.allCenters;
  }

  async fetchAllCenters() {
    this._spinner.show();
    await this.http.get(environment.apiUrl + '/base/centers/').toPromise().then(centers => {
      this.allCenters = centers;
      this.activeCenters = this.allCenters.filter(center => center.is_displayed);
      this._spinner.hide();
    });

  }

}