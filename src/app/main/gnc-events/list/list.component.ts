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
    itemList: any;

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
    }

    ngOnInit() {
        this.fetchData();
    }

    gotoStep(step): void {
        // Decide the animation direction
        this.animationDirection = this.currentStep < step ? "left" : "right";

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Set the current step
        this.currentStep = step;
    }

    gotoNextStep(): void {
        if (this.currentStep === this.itemList.length - 1) {
            return;
        }

        // Set the animation direction
        this.animationDirection = "left";

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Increase the current step
        this.currentStep++;
    }

    gotoPreviousStep(): void {
        if (this.currentStep === 0) {
            return;
        }

        // Set the animation direction
        this.animationDirection = "right";

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Decrease the current step
        this.currentStep--;
    }

    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    async fetchData() {
        if (
            this.dataService.category == null ||
            this.dataService.category == ""
        ) {
            this.router.navigate(["/categories"]);
            return;
        }
        this.spinner.show();

        await this.eventService
            .fetchEvents()
            .then(data => {
                this.itemList = data;
                this.spinner.hide();
            })
            .catch(err => {
                this.spinner.hide();
                this._snackBar.open("Some Error Occured " + err);
            });
    }

    eventClicked(event: any) {
        this.dataService.event = event;
        this.router.navigate(["registration-form"]);
    }
}
