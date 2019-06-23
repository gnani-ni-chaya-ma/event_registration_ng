import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ListComponent } from './list/list.component';
import { CategoriesComponent } from './categories/categories.component';
import { FuseSidebarModule } from '@fuse/components';
import { MatSelectModule, MatInputModule, MatIconModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { AcademyCourseService } from './course.service';

const routes = [
  {
    path: '',
    redirectTo: 'list',
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
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    FuseSharedModule,
    FuseSidebarModule
  ],
  providers: []
})
export class GncEventsModule { }
