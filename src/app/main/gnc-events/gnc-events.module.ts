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

const routes = [
    {
        path: "",
        redirectTo: "categories",
        pathMatch: "full"
    },
    {
        path: "categories",
        component: CategoriesComponent
    },
    {
        path: "list",
        component: ListComponent
    },
    {
        path: "event-details",
        component: EventDetailsComponent
    },
    {
        path: "registration-form",
        component: RegistrationFormComponent
    },
    {
        path: "registration-info",
        component: RegistrationInfoComponent
    }
];

@NgModule({
    declarations: [
        RegistrationFormComponent,
        ListComponent,
        EventDetailsComponent,
        CategoriesComponent,
        RegistrationInfoComponent
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
    providers: []
})
export class GncEventsModule {}
