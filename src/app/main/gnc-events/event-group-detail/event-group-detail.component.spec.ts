import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGroupDetailComponent } from './event-group-detail.component';

describe('EventGroupDetailComponent', () => {
  let component: EventGroupDetailComponent;
  let fixture: ComponentFixture<EventGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
