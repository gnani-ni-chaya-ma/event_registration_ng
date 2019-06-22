import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventCategoriesComponent } from './event-categories/event-categories.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'event-categories',
    pathMatch: 'full'
  },
  {
    path: 'event-categories',
    component: EventCategoriesComponent
  },
  {
    path: 'event-list',
    component: EventListComponent
  },
  {
    path: 'event-form',
    component: EventFormComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
