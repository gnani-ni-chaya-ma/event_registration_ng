import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ListComponent } from './list/list.component';
import { CategoriesComponent } from './categories/categories.component';
import { MatIconModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatChipsModule, MatFormFieldModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule, MatRippleModule, MatSidenavModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseMaterialColorPickerModule, FuseConfirmDialogModule } from '@fuse/components';


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
  declarations: [RegistrationFormComponent, 
    ListComponent,
     CategoriesComponent,
     ],
  imports: [
    RouterModule.forChild(routes),
    MatIconModule,
    BrowserAnimationsModule,
    
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,

    

    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseMaterialColorPickerModule,
    CommonModule,
  
  ]
})
export class GncEventsModule { }
