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
      { title: '1', content: 'hahaha !!! Data 01 here !' },
      { title: '2', content: 'hahaha !!! Data 02 here !' },
      { title: '3', content: 'hahaha !!! Data 03 here !' },
      { title: '4', content: 'hahaha !!! Data 04 here !' },
      { title: '5', content: 'hahaha !!! Data 05 here !' },
      { title: '6', content: 'hahaha !!! Data 06 here !' },
      { title: '7', content: 'hahaha !!! Data 07 here !' }
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
