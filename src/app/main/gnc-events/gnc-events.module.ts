import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { ListComponent } from "./list/list.component";
import { CategoriesComponent } from "./categories/categories.component";
import { MatSelectModule, MatSnackBarModule, MatCardModule, MatDividerModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";

import {
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatChipsModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTooltipModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseMaterialColorPickerModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
} from "@fuse/components";

import { FormsModule } from "@angular/forms";
import {
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatRadioModule
} from "@angular/material";
import { RegistrationInfoComponent } from "./registration-form/registration-info/registration-info.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import {DataResolver} from '../../resolver/data.resolver';
import { EventGroupDetailComponent } from './event-group-detail/event-group-detail.component' ;
import { EventCategoryComponent } from './event-category/event-category.component';
import { CategoriesNewComponent } from './categories-new/categories-new.component';
import { FormClosedComponent } from './registration-form/form-closed/form-closed.component';

const routes = [
    {
        path: "",
        redirectTo: "list",
        pathMatch: "full"
    },
    {
        path: "categories",
        redirectTo: "list",
        resolve: { items: DataResolver }
    },
    {
        path: "list",
        component: ListComponent,
        resolve: { items: DataResolver }

    },
    {
        path: "event-details",
        component: EventDetailsComponent,
        resolve: { items: DataResolver }

    },
    {
        path: "event-group",
        component: EventGroupDetailComponent,
        resolve: { items: DataResolver }

    },
    {
        path: "registration-form",
        component: RegistrationFormComponent,
        resolve: { items: DataResolver }

    },
    {
        path: "registration-form/:eventId",
        component: RegistrationFormComponent,
        resolve: { items: DataResolver }

    },
    {
        path: "registration-info",
        component: RegistrationInfoComponent
    },
    {
        path: "form-closed",
        component: FormClosedComponent
    }
];

@NgModule({
    declarations: [
        RegistrationFormComponent,
        ListComponent,
        EventDetailsComponent,
        CategoriesComponent,
        RegistrationInfoComponent,
        EventGroupDetailComponent,
        EventCategoryComponent,
        CategoriesNewComponent,
        FormClosedComponent
    ],
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
        MatCardModule,
        MatDividerModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatSnackBarModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        CommonModule
    ],
    providers: [DataResolver]
})
export class GncEventsModule {}
