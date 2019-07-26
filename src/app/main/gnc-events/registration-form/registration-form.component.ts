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
    event: any;
    centers: any = [];
    centerGroups: YmhtLocationGroup[] = [];
    centerGroupOptions: Observable<YmhtLocationGroup[]>;

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

        this.centerGroupOptions = this.eventForm
            .get("ymhtLocationGroup")!
            .valueChanges.pipe(
                startWith(""),
                map(value => this._filterGroup(value))
            );
        this.setAgeListner();
    }

    async fetchCenters() {
        console.log(this.dataService.event);

        this.centers = await this.eventService.fetchCenters();
        console.log(this.centers);
        // this.eventForm.get("ymhtLocationGroup").setValue('test');
        this.eventForm.get("firstName").setValue("test");

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
            email: ["", [Validators.required, Validators.email]],
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
            role: ["participant", Validators.required]
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
                console.log("enabled");
                // this.eventForm.get('role').setValidators([Validators.required]);
            } else {
                this.ageGreaterThan21 = false;
                this.eventForm.get("role").setValue("participant");
                // this.eventForm.get('role').setValidators(null);
            }
        });
    }

    submitForm() {
        let response = this.eventService.submitForm(this.eventForm.value);
        response
            .then(data => {
                this._snackBar.open("Registration Successful", "Ok", {
                    duration: 3000,horizontalPosition: 'center',verticalPosition: 'top'
                });
            })
            .catch(e => {
                this._snackBar.open("Erro in Registration" + e, "Ok", {
                    duration: 3000,horizontalPosition: 'center',verticalPosition: 'top'
                });
            });
    }

    displayFn(center): string {
        return center.name;
    }

    selected(center) {
        console.log(center);
    }

    onSelectionChanged(event: MatAutocompleteSelectedEvent) {
        console.log(event.option.value);
    }

    validateLocation(value) {
        console.log(this.centers);
        var center = this.centers.find(
            x => value.toLowerCase() === x.name.toLowerCase()
        );
        var index = this.centers.indexOf(center);
        if (index === -1) {
            center = this.centers.find(x => this.event.id === x.id);
            console.log(center);
        }
        this.eventForm.get("ymhtLocationGroup").setValue(center);
    }
}
