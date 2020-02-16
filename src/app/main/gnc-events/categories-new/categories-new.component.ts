import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';
import { DataService } from '../services/dataService.service';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-categories-new',
  templateUrl: './categories-new.component.html',
  styleUrls: ['./categories-new.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None

})
export class CategoriesNewComponent implements OnInit {

  categoryList: any;

  constructor(
    private eventService: EventService,
    private router: Router,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  async getCategories() {
    try {
      this.spinner.show();
      this.categoryList = await this.eventService.fetchCategories().toPromise();
      console.log("categories", this.categoryList);
      this.spinner.hide();
      // this.categoryList = categories.filter((category: { id: number; }) => category.id === 4);
    } catch (error) {
      this.spinner.hide();
      this._snackBar.open("Some Error Occured " + error);
    }
  }

}
