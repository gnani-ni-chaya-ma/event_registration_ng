import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-group-detail',
  templateUrl: './event-group-detail.component.html',
  styleUrls: ['./event-group-detail.component.scss']
})
export class EventGroupDetailComponent implements OnInit {

  constructor(
    private _dataService: DataService,
    private router: Router,
  ) { }

  eventGroup: any;
  eventList: any;

  ngOnInit() {
    if (
      this._dataService.eventGroup == null ||
      this._dataService.eventGroup == ""
    ) {
      this.router.navigate(["/list"]);
      return;
    }

    this.eventGroup = this._dataService.eventGroup;

    this.eventList = this.eventGroup.events;
    console.log(this.eventGroup);

  }

  eventClicked(event: any) {
    this._dataService.event = event;

    this.router.navigate(["event-details"]);
  }

}
