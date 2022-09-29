import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScrollbarModule } from "../../../core/scrollbar/scrollbar.module";
import { AdminRoutingModule } from "./admin.routing";
import {
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
} from "@angular/material";
import { AdminComponent } from "./admin.component";
import { AdminPitzComponent } from "./admin-pitz/admin-pitz.component";
import { AdminCentralizedComponent } from "./admin-centralized/admin-centralized.component";
import { TableInProgressComponent } from "./admin-pitz/table-in-progress/table-in-progress.component";
import { TableReceivedComponent } from "./admin-pitz/table-received/table-received.component";
import { TableFinishedComponent } from "./admin-pitz/table-finished/table-finished.component";
import { StateWidgetComponent } from "./admin-pitz/state-widget/state-widget.component";
import { PitzerFormComponent } from "./admin-centralized/pitzer/pitzer-form/pitzer-form.component";
import { TablePitzerComponent } from "./admin-centralized/pitzer/table-pitzer/table-pitzer.component";
import { CdkTableModule } from "@angular/cdk/table";
import { UtilsModule } from "src/app/core/utils/utils.module";
import { TableServicesComponent } from "./admin-pitz/table-services/table-services.component";
import { TableAdminComponent } from "./admin-pitz/table-admin/table-admin.component";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollbarModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSidenavModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatMenuModule,
    UtilsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    AdminComponent,
    AdminPitzComponent,
    AdminCentralizedComponent,
    TableInProgressComponent,
    TableReceivedComponent,
    TableFinishedComponent,
    StateWidgetComponent,
    TableServicesComponent,
    PitzerFormComponent,
    TablePitzerComponent,
    TableAdminComponent,
  ],
})
export class AdminModule {}
