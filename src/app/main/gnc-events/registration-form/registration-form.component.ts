import { Component, OnInit } from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    FormControl,
    Validators
} from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { DataService } from "../services/dataService.service";
import { Router } from "@angular/router";
import { EventService } from "../services/event.service";
import { MatAutocompleteSelectedEvent, MatSnackBar } from "@angular/material";

import { NgxSpinnerService } from "ngx-spinner";

export interface YmhtLocationGroup {
    letter: string;
    centers: any[];
}

const otherReplacement = "Didn't find your city?";


export const _filter = (opt: any[], value: any): any[] => {
    const filterValue = value.name
        ? value.name.toLowerCase()
        : value.toLowerCase();

    return opt.filter(

        (item) => { 

            // To always display Other center`
            if(item.name.toLowerCase() === otherReplacement.toLowerCase()){
                return true;
            } 
            return item.name.toLowerCase().indexOf(filterValue) === 0
        
        }
    );
};

@Component({
    selector: "app-registration-form",
    templateUrl: "./registration-form.component.html",
    styleUrls: ["./registration-form.component.scss"]
})
export class RegistrationFormComponent implements OnInit {

    ageGreaterThan21: boolean = false;
    isOtherCenter: boolean = false;
    minDate = new Date(1950, 0, 1);
    maxDate = new Date(2010, 0, 1);
    event: any;
    centers: any = [];
    centerGroups: YmhtLocationGroup[] = [];
    centerGroupOptions: Observable<YmhtLocationGroup[]>;

    constructor(
        private _formBuilder: FormBuilder,
        private dataService: DataService,
        private router: Router,
        private eventService: EventService,
        private _snackBar: MatSnackBar,
        private spinner: NgxSpinnerService
    ) {
        this.eventForm = _formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            other_center: [""],
            email: ["", [Validators.email]],
            birthday: ["", Validators.required],
            phone: [
                "",
                [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(10),
                    Validators.pattern("^[0-9]*$")
                ]
            ],
            ymhtLocationGroup: ["", [Validators.required]],
            role: ["participant", [Validators.required]],
            accommodation: ["", [Validators.required]]
        });

    }

    ngOnInit(): void {
        if (
            this.dataService.event == null ||
            this.dataService.event == undefined
        ) {
            this.router.navigate(["/categories"]);
            return;
        }

        this.fetchCenters();
        this.event = this.dataService.event;
        console.log(this.event);

        if (!this.event.accommodation_provided) {
            this.eventForm.get("accommodation").setValue(false);
        }
        this.centerGroupOptions = this.eventForm
            .get("ymhtLocationGroup")!
            .valueChanges.pipe(
                startWith(""),
                map(value => this._filterGroup(value))
            );
        this.setAgeListner();
        this.serCenterListner();
        console.log("HERE");


    }

     fetchCenters() {
        // console.log(this.dataService.event);
        try {
            this.centers = this.dataService.getActiveCenters();
        } catch (e) {
            this._snackBar.open("Some Error Occured");
        }
        for (var key in this.centers) {
            var center = this.centers[key];
            if(center.name === "Other"){
                center.name = otherReplacement
                this.centerGroups.push({
                    letter: " ",
                    centers: [center]
                })
                continue;
            }

            var index = this.centerGroups.indexOf(
                this.centerGroups.find(x => center.name.charAt(0) == x.letter)
            );
            if (index != -1) {
                this.centerGroups[index].centers.push(center);
            } else {
                this.centerGroups.push({
                    letter: center.name.charAt(0),
                    centers: [center]
                });
            }
        }
        this.centerGroups.sort((a, b) => (a.letter > b.letter ? 1 : -1));
        this.centerGroups.forEach(centerGroup => {
            // console.log(centerGroup.centers);

            centerGroup.centers.sort((a, b) => (a.name > b.name ? 1 : -1));
        });
        
        // To prefill the center
        // this.eventForm.patchValue({
        //     ymhtLocationGroup: this.centerIdToCenter(this.event.center)
        // });
        // console.log(this.centerGroups);
    }
    private _filterGroup(value: string): YmhtLocationGroup[] {
        if (value) {
            return this.centerGroups
                .map(group => ({
                    letter: group.letter,
                    centers: _filter(group.centers, value)
                }))
                .filter(group => group.centers.length > 0);
        }
        return this.centerGroups;
    }

    eventForm: FormGroup;


    _calculateAge(birthday) {
        // birthday is a date
        var ageDifMs = Date.now() - new Date(birthday).getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    setAgeListner() {
        this.eventForm.get("birthday").valueChanges.subscribe(form => {
            if (this._calculateAge(form) >= 21) {
                this.ageGreaterThan21 = true;
                this.eventForm.get("role").setValue("");
            } else {
                this.ageGreaterThan21 = false;
                this.eventForm.get("role").setValue("participant");
                // this.eventForm.get('role').setValidators(null);
            }
        });
    }

    serCenterListner() {
        this.eventForm
            .get("ymhtLocationGroup")
            .valueChanges.subscribe(center => {
                if (center) {
                    if (center.name === otherReplacement) {
                        this.isOtherCenter = true;
                    } else {
                        this.isOtherCenter = null;
                    }
                }
            });
    }

    submitForm() {
        this.spinner.show();

        let formData = this.eventForm.value;
        let itemList: string = "";
        formData.itemList = itemList;
        let response = this.eventService.submitForm(formData);
        response
            .then(data => {
                this.spinner.hide();

                this._snackBar.open("Registration Successful", "Ok", {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: "top"
                });
                // console.log(data);
                this.dataService.registeredUserInfo = data;
                this.router.navigate(["registration-info"]);
            })
            .catch(e => {
                this._snackBar.open("Erro in Registration" + e, "Ok", {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: "top"
                });
            });
    }

    displayFn(center): string {
        // console.log("--->>>", center);
        return center ? center.name : "";
    }

    selected(center) {
        // console.log(center);
    }
    centerIdToCenter(centerId) {
        // console.log("HERE 2");

        console.log("CenterList", this.centers);
        // console.log();
        let cen = this.centers.filter(center => center.id === centerId)[0];
        console.log(
            "ymhtLocatioGroup:: ",
            this.eventForm.get("ymhtLocationGroup")
        );
        // console.log("center ::", cen);

        this.eventForm.get("ymhtLocationGroup").setValue(cen);
        return cen;
    }


    validateLocation(event) {
        //console.log(value.relatedTarget);
        if (event.relatedTarget) {
            // console.log(event.relatedTarget.className);
            if (event.relatedTarget.className.includes("mat-option")) {
                return;
            }
        }
        let value = event.target.value;
        //console.log(this.centers);
        var center = this.centers.find(
            x => value.toLowerCase() === x.name.toLowerCase()
        );
        var index = this.centers.indexOf(center);
        if (index === -1) {
            // center = this.centers.find(x => this.event.id === x.id);
            //console.log(center);
        }
        this.eventForm.get("ymhtLocationGroup").setValue(center);
    }
}
