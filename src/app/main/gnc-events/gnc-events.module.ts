import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ListComponent } from './list/list.component';
import { CategoriesComponent } from './categories/categories.component';
import { MatSelectModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import {
  MatIconModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule,
  MatDialogModule, MatChipsModule, MatListModule, MatProgressBarModule, MatSidenavModule, MatTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseMaterialColorPickerModule, FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule, MatAutocompleteModule, MatRadioModule } from '@angular/material';


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
      
      HttpClientModule,

      MatSelectModule,
      BrowserAnimationsModule,
      MatChipsModule,
      MatDialogModule,      
      MatListModule,
      MatProgressBarModule,
      MatSidenavModule,
      MatTooltipModule,
      FuseMaterialColorPickerModule,
      FormsModule,
      MatButtonModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatMenuModule,
      MatRippleModule,
      MatTableModule,
      MatToolbarModule,
      MatAutocompleteModule,
      MatRadioModule,
      MatSnackBarModule,
      FuseSharedModule,
      FuseConfirmDialogModule,
      FuseSidebarModule,
      CommonModule
    ],
    providers: []
  })
export class GncEventsModule { }
