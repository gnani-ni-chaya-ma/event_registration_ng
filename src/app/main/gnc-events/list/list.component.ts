import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectorRef,
    QueryList,
    ViewChildren
} from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { FusePerfectScrollbarDirective } from "@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive";
import { EventService } from "../services/event.service";
import { Observable } from "rxjs";
import { Route } from "@angular/compiler/src/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../services/dataService.service";
import { MatSnackBar } from "@angular/material";

import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ListComponent implements OnInit {
    animationDirection: "left" | "right" | "none";
    eventList: any;

    courseStepContent: any;
    currentStep: number;

    categoryName: string;

    allCenters;
    groupedEvents = [];

    colorList = ["#e7b2a5", "#f1935c", "#ffe75e", "#beebe9", "#fffdf9","#ffe3ed","#ecdfc8","#ff9d9d","#eab0d9","#feb377","#deddfa","#eef9bf","#a7e9af","#b0eacd","#bac7a7"];

    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService,
        private eventService: EventService,
        private router: Router,
        private dataService: DataService,
        private _snackBar: MatSnackBar,
        private spinner: NgxSpinnerService
    ) {
        this.animationDirection = "none";
        this.currentStep = 0;
    }

    ngOnInit() {
        this.fetchData();
    }

    async fetchData() {
        // if (
        //     this.dataService.category == null ||
        //     this.dataService.category == ""
        // ) {

        //     // HARDCODED SUMMERCAMP

        //     this.dataService.category = {  "id":4 , "category": "Summer Camp" }
        //     // this.router.navigate(["/categories"]);
        //     // return;
        // }

        this.dataService.category = {  "id":4 , "category": "Summer Camp" }

        this.spinner.show();
console.log("HERERERER");




        await this.eventService
            .fetchEvents()
            .then((data: any) => {
                this.eventList = data

                this.spinner.hide();
            })
            .catch(err => {
                this.spinner.hide();
                this._snackBar.open("Some Error Occured " + err);
            });

        this.formatEvents();
        // console.log(this.eventList);


    }

    getRandomColor(){
        return this.colorList[Math.floor(Math.random() * this.colorList.length)];
    }

    formatEvents() {
        this.allCenters = this.dataService.getAllCenters().slice();
        // console.log(this.allCenters);
        for (let i = 0; i < this.eventList.length; i++) {

            // ALLOCATE RANDOM COLOUR
            this.eventList[i]["backColor"] = this.getRandomColor();

            let event = this.eventList[i];
            let centerId = event.center; // Get event Center id
            let center = this.allCenters.filter(center => center.id === centerId)[0]; // Get event Center object from id

            if (center.parent) {
                let centerIdInGroup = this.groupedEvents.findIndex(eventGroup => eventGroup.centerId === center.parent);
                let parentCenter = this.allCenters.filter(tempCenter => { 
                   return tempCenter.id === center.parent;
                
                })[0]; // Get parent Center

                if (centerIdInGroup == -1) {
                    this.groupedEvents.push({ "centerId": center.parent, "events": [event], "parent": parentCenter, "backColor": this.getRandomColor() });
                }
                else {
                    this.groupedEvents[centerIdInGroup]["events"].push({ ...event });
                }
                this.eventList.splice(i, 1);
                // console.log(this.eventList);
                i--;
            }
            else{
                this.eventList[i]["centerName"] = center.name;
            }
        }
        console.log(this.groupedEvents);
    }

    eventClicked(event: any) {
        this.dataService.event = event;

        this.router.navigate(["registration-form/" + event.id]);
    }

    eventGroupClicked(eventgroup){
        this.dataService.eventGroup = eventgroup;
        this.router.navigate(["event-group"]);

    }
}
