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
    selector: "app-event-details",
    templateUrl: "./event-details.component.html",
    styleUrls: ["./event-details.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EventDetailsComponent {
    animationDirection: "left" | "right" | "none";
    itemList: any;
    step: any;

    courseStepContent: any;
    currentStep: number;

    categoryName: string;

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
        this.step = this.dataService.event;
        
    }


    eventClicked(event: any) {
        this.dataService.event = event;
        this.router.navigate(["registration-form"]);
    }
}
