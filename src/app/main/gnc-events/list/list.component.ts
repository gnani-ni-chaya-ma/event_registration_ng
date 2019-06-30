import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, QueryList, ViewChildren } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

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
  course = {
    steps: [
      { title: 'Ahmedabad ok long text', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '400.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
      { title: 'Surat', eventsDate: '30th Jun 2019 - 30th Jun 2019', fees: '300.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
      { title: 'Baroda', eventsDate: '04th July 2019 - 05th July 2019', fees: '500.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
      { title: 'SimCity', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '600.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
      { title: 'Mumbai', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '200.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
      { title: 'Gandhidham', eventsDate: '29th Jun 2019 - 30th Jun 2019', fees: '400.00', lastDate: '26th Jun 2019', lateFee: '100.00', venue: 'Krupali Farm, Near Wonder Villa, Vav-Jokha Road, Vav Village, Kamrej Taluka, Surat-GJ, IN, 0', contact: '9537371313', },
    ]
  };
  courseStepContent: any;
  currentStep: number;

  @ViewChildren(FusePerfectScrollbarDirective)
  fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

  constructor(
    // private _academyCourseService: AcademyCourseService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseSidebarService: FuseSidebarService
  ) {
    this.animationDirection = 'none';
    this.currentStep = 0;
  }

  ngOnInit() {
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
    if (this.currentStep === this.course.steps.length - 1) {
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

}
