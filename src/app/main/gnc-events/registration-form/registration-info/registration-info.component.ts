import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/dataService.service";
import { EventService } from "../../services/event.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
    selector: "app-registration-info",
    templateUrl: "./registration-info.component.html",
    styleUrls: ["./registration-info.component.scss"]
})
export class RegistrationInfoComponent implements OnInit {
    userData: any;
    eventCenter: any;

    constructor(
        private dataService: DataService,
        private eventService: EventService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        if (
            this.dataService.registeredUserInfo == null ||
            this.dataService.registeredUserInfo == undefined
        ) {
            this.router.navigate(["/categories"]);
            return;
        }
        this.userData = this.dataService.registeredUserInfo;
        this.fetchEvent();
        console.log(this.userData);
    }

    fetchEvent() {
        this.eventService
            .fetchEvent(this.userData.event)
            .then(data => {
                console.log(data);
                this.eventCenter = data;
            })
            .catch(err => {
                this._snackBar.open("Some Error Occured");
            });
    }
}
