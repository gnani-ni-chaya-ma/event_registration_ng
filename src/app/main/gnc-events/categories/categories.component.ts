import {Component} from '@angular/core';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';
import { DataService } from '../services/dataService.service';
import { MatSnackBar } from '@angular/material';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-event-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {

    constructor(
      private eventService: EventService,
      private router: Router,
      private dataService: DataService,
      private _snackBar: MatSnackBar
    ){}

    categoryList: any;

    ngOnInit() {
      this.fetchData();
    } 

    navigate(category){
      console.log(category.category);
      this.dataService.category = category;
      this.router.navigate(['/list']);
    }

    async fetchData(){
      await this.eventService.fetchEventCategories().then(data=>{
        this.categoryList = data;
      }).catch(err=>{
        this._snackBar.open("Some Error Occured " + err);
      });
    
      
      

      this.categoryList.splice(0,1);
    }
  }
