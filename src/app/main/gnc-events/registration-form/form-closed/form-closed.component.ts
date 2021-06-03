import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DataService } from '../../services/dataService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
@Component({
  selector: 'app-form-closed',
  templateUrl: './form-closed.component.html',
  styleUrls: ['./form-closed.component.scss']
})
export class FormClosedComponent implements OnInit {

  urlEventId: string;
  event: any = {};
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dataService: DataService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private eventService: EventService
  ) { }

  async ngOnInit() {
    await this.fetchUrlEvent()
    if (
      this.dataService.event == null ||
      this.dataService.event == undefined
    ) {
      this.router.navigate(["/categories"]);
      return;
    }
  }
  goToUrl(): void {
    this.document.location.href = this.event.redirect_link;
  }


  async fetchUrlEvent() {
    if (this.dataService.event && this.dataService.event.id === this.urlEventId) {
      this.event = this.dataService.event;
      return;
    }
    this.urlEventId = this._activatedRoute.snapshot.paramMap.get("eventId");

    if (this.urlEventId) {
      await this.eventService.fetchEvent(parseInt(this.urlEventId)).then(eventData => {
        // debugger;
        // debugger;
        this.dataService.event = eventData;
        this.event = {...this.parseExtras(eventData["rules"]), ...eventData} ;
      })
    }
  }

  parseExtras(extras) {
    try {
      return JSON.parse(extras);
    }
    catch (err) {
      return {
        "close_message": "",
        "redirect_link": "",
        "redirect_button_text": "",
      };
    }
  }
}
