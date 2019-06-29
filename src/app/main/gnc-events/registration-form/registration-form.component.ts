import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface YmhtLocationGroup {
  letter: string;
  names: string[];
}


export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  ageGreaterThan21: boolean = false;
  ngOnInit(): void {
    this.stateGroupOptions = this.eventForm.get('ymhtLocationGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );

    this.eventForm.get('birthday').valueChanges.subscribe(form => {

      // console.log(this._calculateAge(f);
      if(this._calculateAge(form) >=21){
        this.ageGreaterThan21 = true;
        this.eventForm.get('role').setValue('');
        console.log("enabled");
        // this.eventForm.get('role').setValidators([Validators.required]);
        
      }
      else{
        this.ageGreaterThan21 = false;
        this.eventForm.get('role').setValue('participant');
        debugger

        console.log("disabled");

       // this.eventForm.get('role').setValidators(null);
      }

    });
  }
  private _filterGroup(value: string): YmhtLocationGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  stateGroups: YmhtLocationGroup[] = [{
    letter: 'A',
    names: ['Ahmedabad', 'Amreli', 'Anand']
  }, {
    letter: 'B',
    names: ['Bengaluru', 'Bharuch', 'Bhavnagar','Bhuj']
  }, {
    letter: 'D',
    names: ['Dahod']
  }, {
    letter: 'G',
    names: ['Gandhidham','Gandhinagar','Godhra','Gondal','Indore']
  }];

  stateGroupOptions: Observable<YmhtLocationGroup[]>;


  eventForm: FormGroup;
  constructor(private _formBuilder: FormBuilder
  ) {
    this.eventForm = _formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      birthday: ["", Validators.required],
      phone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      ymhtLocationGroup: ["", Validators.required],
      role: ["participant", Validators.required]
    });
  }

  _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  submitForm(){
    console.log(this.eventForm.value);
    
  }
}

// https://stackblitz.com/angular/gqvvrqqloqo?file=app%2Fautocomplete-optgroup-example.ts