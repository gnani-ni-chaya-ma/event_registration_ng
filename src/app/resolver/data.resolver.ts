import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { DataService } from 'app/main/gnc-events/services/dataService.service';


@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<any> {
  constructor( private _dataService: DataService) {}

  async resolve() {
    console.log("IN RESOLVER");
    
    // if(this._dataService.centerList && this._dataService.categoryList){
      // return true;
    // }
   await this._dataService.fetchMasterData();

  }
}