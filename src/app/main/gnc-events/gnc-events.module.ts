import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ListComponent } from './list/list.component';
import { CategoriesComponent } from './categories/categories.component';

const routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'registration-form',
    component: RegistrationFormComponent
  }
];


@NgModule({
  declarations: [RegistrationFormComponent, ListComponent, CategoriesComponent],
  imports: [
    RouterModule.forChild(routes),

    CommonModule
  ]
})
export class GncEventsModule { }
