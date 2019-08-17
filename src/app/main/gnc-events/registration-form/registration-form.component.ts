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

export interface YmhtLocationGroup {
    letter: string;
    centers: any[];
}

export const _filter = (opt: any[], value: any): any[] => {
    const filterValue = value.name
        ? value.name.toLowerCase()
        : value.toLowerCase();

    return opt.filter(
        item => item.name.toLowerCase().indexOf(filterValue) === 0
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
    // isEventFuzion: boolean = false;
    event: any;
    centers: any = [];
    centerGroups: YmhtLocationGroup[] = [];
    centerGroupOptions: Observable<YmhtLocationGroup[]>;
    // eventItems = [
    //     {id: 0,name: "Pen Stand"},
    //     {id: 1,name: "Photo Frame"},
    //     {id: 2,name: "Key Stand"},
    //     {id: 3,name: "Decorative Cup"},
    //     {id: 4,name: "Drawing Art"},
    //     {id: 5,name: "Schedule Board / Calender"},
    //     {id: 6,name: "ઝુમ્મર(ceiling decoration)"},
    //     {id: 7,name: "Gift Article"},
    //     {id: 8,name: "Piggy Bank"},
    //     {id: 9,name: "Night Lamp"},
    //     {id: 10,name: "Bird Eatery"},
    //     {id: 11,name: "Bird Home"},
    //     {id: 12,name: "Fountain"},
    //     {id: 13,name: "Decorative Divo"},
    //     {id: 14,name: 'Decorative Arti Thali'},
    //     {id: 15,name: 'Craft Item'}
    // ];
    // selectedEventItems = [];

    ngOnInit(): void {
        if (
            this.dataService.event == null ||
            this.dataService.event == undefined
        ) {
            this.router.navigate(["/categories"]);
            return;
        }
        // if(this.dataService.category.name === "Fuzion"){
        //     this.isEventFuzion = true;
        // }
        this.fetchCenters();
        this.event = this.dataService.event;

        this.centerGroupOptions = this.eventForm
            .get("ymhtLocationGroup")!
            .valueChanges.pipe(
                startWith(""),
                map(value => this._filterGroup(value))
            );
        this.setAgeListner();
        this.serCenterListner();
    }

    async fetchCenters() {
        // console.log(this.dataService.event);
        try {
            this.centers = await this.eventService.fetchCenters();
        } catch (e) {
            this._snackBar.open("Some Error Occured");
        }
        for (var key in this.centers) {
            var center = this.centers[key];
            if (center.id == this.event.id) {
                console.log(center);
                //this.centerChoosen = center;
                this.eventForm.get("ymhtLocationGroup").setValue(center);
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
    constructor(
        private _formBuilder: FormBuilder,
        private dataService: DataService,
        private router: Router,
        private eventService: EventService,
        private _snackBar: MatSnackBar
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
            role: ["participant", [Validators.required]]
        });
    }

    _calculateAge(birthday) {
        // birthday is a date
        var ageDifMs = Date.now() - new Date(birthday).getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    setAgeListner() {
        this.eventForm.get("birthday").valueChanges.subscribe(form => {
            // console.log(this._calculateAge(f);
            if (this._calculateAge(form) >= 21) {
                this.ageGreaterThan21 = true;
                this.eventForm.get("role").setValue("");
                //console.log("enabled");
                // this.eventForm.get('role').setValidators([Validators.required]);
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
                    if (center.name === "Other") {
                        this.isOtherCenter = true;
                    } else {
                        this.isOtherCenter = null;
                    }
                }
            });
    }

    submitForm() {
        let formData = this.eventForm.value;
        let itemList: string = '';
        // if(this.selectedEventItems.length == 0){
        //     this._snackBar.open("Please Select Atleast one item from the List","Ok",{duration: 3000});
        //     return;
        // }
        // else{
        //     this.selectedEventItems.forEach(item => {
        //         itemList = itemList  +  item.name + ', ';
        //     });
        //     console.log(formData);    
        // }
        formData.itemList = itemList;
        let response = this.eventService.submitForm(formData);
        response
            .then(data => {
                this._snackBar.open("Registration Successful", "Ok", {
                    duration: 3000,
                    horizontalPosition: "center",
                    verticalPosition: "top"
                });
                console.log(data);
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
        console.log("--->>>", center);
        return center ? center.name : "";
    }

    selected(center) {
        console.log(center);
    }

    validateLocation(event) {
        //console.log(value.relatedTarget);
        // debugger
        if (event.relatedTarget) {
            console.log(event.relatedTarget.className);
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
            center = this.centers.find(x => this.event.id === x.id);
            //console.log(center);
        }
        this.eventForm.get("ymhtLocationGroup").setValue(center);
    }

    // itemChecked(index){
    //     let itemChecked = this.eventItems[index];
    //     let selectedItemIndex = this.selectedEventItems.indexOf(itemChecked);
        
    //     if(selectedItemIndex == -1){
    //         this.selectedEventItems.push(itemChecked);
    //     }
    //     else{
    //         this.selectedEventItems.splice(selectedItemIndex,1)     
    //     }
    //     console.log(this.selectedEventItems);
    // }
}
