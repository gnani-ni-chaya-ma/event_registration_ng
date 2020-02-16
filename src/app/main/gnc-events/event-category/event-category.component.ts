import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'event-category',
  templateUrl: './event-category.component.html',
  styleUrls: ['./event-category.component.scss']
})
export class EventCategoryComponent implements OnInit {

  @Input('category-name') categoryName: string;
  @Input('category-id') categoryId: number;

  constructor() { }

  ngOnInit() {
  }

}
