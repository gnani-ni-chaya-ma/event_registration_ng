import {Component} from '@angular/core';

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
    boards: any[]  = [{title:"Fuzion",imgUrl:"https://material.angular.io/assets/img/examples/shiba2.jpg",color:"red",link:"/registration-form"},
    {title:"Fuzion",imgUrl:"https://material.angular.io/assets/img/examples/shiba2.jpg",color:"green",link:"/list"},
    {title:"Yuva",imgUrl:"https://material.angular.io/assets/img/examples/shiba2.jpg",color:"yellow",link:"/list"},
    {title:"Yuva",imgUrl:"https://material.angular.io/assets/img/examples/shiba2.jpg",color:"blue",link:"/list"},
    {title:"Yuva",imgUrl:"https://material.angular.io/assets/img/examples/shiba2.jpg",color:"skyblue",link:"/list"},
    {title:"Fuzion",imgUrl:"https://material.angular.io/assets/img/examples/shiba2.jpg",color:"green",link:"/list"}];
}
