import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, QueryList, ViewChildren } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { EventService } from '../services/event.service';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/dataService.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ListComponent implements OnInit {


  animationDirection: 'left' | 'right' | 'none';
  // course.steps
  itemList: any;
  // course = {
  //   steps: [
  //     { title: 'Ahmedabad ok long text', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '400.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Surat', eventsDate: '30th Jun 2019 - 30th Jun 2019', fees: '300.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Baroda', eventsDate: '04th July 2019 - 05th July 2019', fees: '500.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'SimCity', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '600.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Mumbai', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '200.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Gandhidham', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '400.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Ahmedabad ok long text', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '400.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Surat', eventsDate: '30th Jun 2019 - 30th Jun 2019', fees: '300.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Baroda', eventsDate: '04th July 2019 - 05th July 2019', fees: '500.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'SimCity', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '600.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Mumbai', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '200.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Gandhidham', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '400.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Ahmedabad ok long text', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '400.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Surat', eventsDate: '30th Jun 2019 - 30th Jun 2019', fees: '300.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Baroda', eventsDate: '04th July 2019 - 05th July 2019', fees: '500.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'SimCity', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '600.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Mumbai', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '200.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //     { title: 'Gandhidham', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '400.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
  //   ]
  // };
  courseStepContent: any;
  currentStep: number;

  categoryName: string;

  @ViewChildren(FusePerfectScrollbarDirective)
  fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

  constructor(
    // private _academyCourseService: AcademyCourseService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseSidebarService: FuseSidebarService,
    private eventService: EventService,
    private router: Router,
    private dataService: DataService
  ) {
    this.animationDirection = 'none';
    this.currentStep = 0;


  }

  ngOnInit() {
    this.fetchData();
  }

  gotoStep(step): void {
    // Decide the animation direction
    this.animationDirection = this.currentStep < step ? 'left' : 'right';

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
    this.animationDirection = 'left';

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
    this.animationDirection = 'right';

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
    if (this.dataService.category == null || this.dataService.category == "") {
      this.router.navigate(['/categories']);
      return;
    }

    var response = await this.eventService.fetchEvents();
    this.itemList = response;
    
  }

  eventClicked(event: any) {
    this.dataService.event = event;
    this.router.navigate(['registration-form']);
  }

}
