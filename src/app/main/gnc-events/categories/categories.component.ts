import {Component} from '@angular/core';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';
import { DataService } from '../services/dataService.service';

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
    boards: any[]  = [{title:"Fuzion",imgUrl:"https://material.angular.io/assets/img/examples/shiba2.jpg",color:"red",link:"/list"},
    {title:"Fuzion",imgUrl:"https://material.angular.io/assets/img/examples/shiba2.jpg",color:"green",link:"/list"},
    {title:"Yuva",imgUrl:"https://material.angular.io/assets/img/examples/shiba2.jpg",color:"yellow",link:"/list"},
    {title:"Yuva",imgUrl:"https://material.angular.io/assets/img/examples/shiba2.jpg",color:"blue",link:"/list"},
    {title:"Yuva",imgUrl:"https://material.angular.io/assets/img/examples/shiba2.jpg",color:"skyblue",link:"/list"},
    {title:"Fuzion",imgUrl:"https://material.angular.io/assets/img/examples/shiba2.jpg",color:"green",link:"/list"}];

    constructor(
      private eventService: EventService,
      private router: Router,
      private dataService: DataService
    ){}

    itemList: any;

    ngOnInit() {
      this.fetchData();
    } 

    navigate(category){
      console.log(category.category);
      this.dataService.category = category;
      this.router.navigate(['/list']);
    }

    async fetchData(){
      var response = await this.eventService.fetchEventCategories();
      this.itemList =  response;
      console.log(response);
    }
  }
